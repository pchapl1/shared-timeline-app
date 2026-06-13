from django.contrib.auth.models import User
from django.utils import timezone

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from activities.models import Activity
from notifications.models import Notification
from .models import Circle, CircleMember, CircleInvite
from .serializers import (
    CircleSerializer,
    CircleMemberSerializer,
    CircleInviteSerializer,
)
from notifications.services import create_notification
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


class CircleViewSet(viewsets.ModelViewSet):
    serializer_class = CircleSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    
    def get_queryset(self):
        queryset = Circle.objects.filter(
            members__user=self.request.user
        ).distinct()

        include_archived = self.request.query_params.get(
            'include_archived'
        )

        if self.action == 'list' and include_archived != 'true':
            queryset = queryset.filter(is_archived=False)

        return queryset.order_by('id')

    def perform_create(self, serializer):
        circle = serializer.save(created_by=self.request.user)

        CircleMember.objects.create(
            circle=circle,
            user=self.request.user,
            role='owner'
        )


class CircleMemberViewSet(viewsets.ModelViewSet):
    serializer_class = CircleMemberSerializer

    def get_queryset(self):
        return CircleMember.objects.filter(
            circle__members__user=self.request.user
        ).distinct().order_by('id')


class CircleInviteViewSet(viewsets.ModelViewSet):
    serializer_class = CircleInviteSerializer

    def get_queryset(self):
        return CircleInvite.objects.filter(
            invited_user=self.request.user
        )

    def create(self, request, *args, **kwargs):
        circle_id = request.data.get('circle')
        invited_user_id = request.data.get('invited_user')

        try:
            circle = Circle.objects.get(id=circle_id)
        except Circle.DoesNotExist:
            return Response(
                {'error': 'Circle not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        if not CircleMember.objects.filter(
            circle=circle,
            user=request.user
        ).exists():
            return Response(
                {'error': 'You are not a member of this circle'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            invited_user = User.objects.get(id=invited_user_id)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        if CircleMember.objects.filter(
            circle=circle,
            user=invited_user
        ).exists():
            return Response(
                {'error': 'User is already a member'},
                status=status.HTTP_400_BAD_REQUEST
            )

        existing_invite = CircleInvite.objects.filter(
            circle=circle,
            invited_user=invited_user
        ).first()

        if existing_invite:
            if existing_invite.status == 'pending':
                return Response(
                    {'error': 'Invite already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            existing_invite.status = 'pending'
            existing_invite.invited_by = request.user
            existing_invite.save()

            serializer = self.get_serializer(existing_invite)

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        invite = CircleInvite.objects.create(
            circle=circle,
            invited_user=invited_user,
            invited_by=request.user,
            status='pending'
        )
        
        create_notification(
            recipient=invited_user,
            actor=request.user,
            notification_type=Notification.CIRCLE_INVITE,
            circle=circle,
        )

        serializer = self.get_serializer(invite)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
    

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        invite = self.get_object()

        if invite.invited_user != request.user:
            return Response(
                {'error': 'Not your invite'},
                status=status.HTTP_403_FORBIDDEN
            )

        if invite.status != 'pending':
            return Response(
                {'error': 'Invite already handled'},
                status=status.HTTP_400_BAD_REQUEST
            )

        CircleMember.objects.get_or_create(
            circle=invite.circle,
            user=request.user,
            defaults={
                'role': 'member'
            }
        )

        invite.status = 'accepted'
        invite.responded_at = timezone.now()
        invite.save()

        Activity.objects.create(
            actor=request.user,
            circle=invite.circle,
            activity_type=Activity.MEMBER_JOINED,
        )

        return Response({
            'message': 'Invite accepted'
        })

    @action(detail=True, methods=['post'])
    def decline(self, request, pk=None):
        invite = self.get_object()

        if invite.invited_user != request.user:
            return Response(
                {'error': 'Not your invite'},
                status=status.HTTP_403_FORBIDDEN
            )

        if invite.status != 'pending':
            return Response(
                {'error': 'Invite already handled'},
                status=status.HTTP_400_BAD_REQUEST
            )

        invite.status = 'declined'
        invite.responded_at = timezone.now()
        invite.save()

        return Response({
            'message': 'Invite declined'
        })