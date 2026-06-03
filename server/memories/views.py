from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response

from .models import Memory, MemoryPhoto, MemoryReaction, MemoryComment
from .serializers import MemorySerializer, MemoryCommentSerializer


class MemoryViewSet(viewsets.ModelViewSet):
    serializer_class = MemorySerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        return Memory.objects.filter(
            circle__created_by=self.request.user
        ).order_by('-memory_date', '-created_at')

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
        memory = self.get_object()

        if request.method == 'GET':
            comments = memory.comments.all()
            serializer = MemoryCommentSerializer(
                comments,
                many=True,
                context={'request': request}
            )

            return Response(serializer.data, status=status.HTTP_200_OK)

        serializer = MemoryCommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                memory=memory,
                user=request.user
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)

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