from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response

from .models import Memory, MemoryPhoto, MemoryReaction, MemoryComment
from .serializers import MemorySerializer, MemoryCommentSerializer
from notifications.models import Notification
from activities.models import Activity
from notifications.services import create_notification, create_circle_notification


class MemoryViewSet(viewsets.ModelViewSet):
    serializer_class = MemorySerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        queryset = Memory.objects.filter(
            circle__members__user=self.request.user
        ).distinct()

        circle_id = self.request.query_params.get('circle')

        if circle_id:
            queryset = queryset.filter(circle_id=circle_id)

        return queryset.order_by('-memory_date', '-created_at')

    def perform_create(self, serializer):
        memory = serializer.save(created_by=self.request.user)

        uploaded_photos = self.request.FILES.getlist('photos')

        if uploaded_photos:
            for photo in uploaded_photos:
                MemoryPhoto.objects.create(
                    memory=memory,
                    image=photo
                )

        elif memory.photo:
            MemoryPhoto.objects.create(
                memory=memory,
                image=memory.photo
            )

        Activity.objects.create(
            actor=self.request.user,
            circle=memory.circle,
            activity_type=Activity.MEMORY_CREATED,
            memory=memory
        )

    @action(detail=True, methods=['post'])
    def toggle_reaction(self, request, pk=None):
        memory = self.get_object()

        existing_reaction = MemoryReaction.objects.filter(
            memory=memory,
            user=request.user,
            reaction_type='like'
        ).first()

        if existing_reaction:
            existing_reaction.delete()
            has_reacted = False
        else:
            MemoryReaction.objects.create(
                memory=memory,
                user=request.user,
                reaction_type='like'
            )

            Activity.objects.create(
                actor=request.user,
                circle=memory.circle,
                activity_type=Activity.REACTION_CREATED,
                memory=memory
            )

            create_circle_notification(
                circle=memory.circle,
                actor=request.user,
                notification_type=Notification.MEMORY_REACTION,
                memory=memory,
            )

            has_reacted = True

        return Response(
            {
                'memory_id': memory.id,
                'has_reacted': has_reacted,
                'reaction_count': memory.reactions.count(),
            },
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['get', 'post'])
    def comments(self, request, pk=None):
        """
        Handles both fetching comments and creating a new comment.

        GET:
            Returns all comments for this memory.

        POST:
            Creates a new comment, saves activity/notification records,
            then broadcasts the new comment over WebSockets so other users
            viewing this memory can see it without refreshing.
        """

        memory = self.get_object()

        # ---------------------------------------------
        # GET /api/memories/<memory_id>/comments/
        # ---------------------------------------------
        if request.method == 'GET':
            comments = memory.comments.all()

            serializer = MemoryCommentSerializer(
                comments,
                many=True,
                context={'request': request}
            )

            return Response(serializer.data, status=status.HTTP_200_OK)

        # ---------------------------------------------
        # POST /api/memories/<memory_id>/comments/
        # ---------------------------------------------
        serializer = MemoryCommentSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new comment to the database.
            comment = serializer.save(
                memory=memory,
                user=request.user
            )

            # Save an activity feed item.
            Activity.objects.create(
                actor=request.user,
                circle=memory.circle,
                activity_type=Activity.COMMENT_CREATED,
                memory=memory,
                comment=comment
            )

            # Create a notification for the memory owner,
            # unless the owner commented on their own memory.
            create_circle_notification(
                circle=memory.circle,
                actor=request.user,
                notification_type=Notification.MEMORY_COMMENT,
                memory=memory,
            )
            # Re-serialize the saved comment.
            # This makes sure the response includes fields added by the database,
            # like id, user info, and created_at.
            comment_data = MemoryCommentSerializer(
                comment,
                context={'request': request}
            ).data

            # Get the active Django Channels layer.
            # This is what lets normal HTTP views send messages to WebSocket groups.
            channel_layer = get_channel_layer()

            # Send the new comment to everyone currently connected to this memory's
            # WebSocket group.
            #
            # Example:
            # memory id 12 sends to group:
            # memory_comments_12
            async_to_sync(channel_layer.group_send)(
                f'memory_comments_{memory.id}',
                {
                    # This calls comment_created() inside MemoryCommentConsumer.
                    'type': 'comment_created',

                    # This is the actual comment data the frontend receives.
                    'comment': comment_data,
                }
            )

            return Response(
                comment_data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        detail=True,
        methods=['delete'],
        url_path='comments/(?P<comment_id>[^/.]+)'
    )
    def delete_comment(self, request, pk=None, comment_id=None):
        memory = self.get_object()

        try:
            comment = MemoryComment.objects.get(
                id=comment_id,
                memory=memory,
                user=request.user
            )
        except MemoryComment.DoesNotExist:
            return Response(
                {'detail': 'Comment not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        comment.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)