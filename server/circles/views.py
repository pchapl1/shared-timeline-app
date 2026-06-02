from django.contrib.auth.models import User
from django.utils import timezone

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Circle, CircleMember, CircleInvite
from .serializers import (
    CircleSerializer,
    CircleMemberSerializer,
    CircleInviteSerializer,
)


class CircleViewSet(viewsets.ModelViewSet):
    serializer_class = CircleSerializer

    def get_queryset(self):
        return Circle.objects.filter(
            members__user=self.request.user
        ).distinct()

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
        ).distinct()


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

        invite, created = CircleInvite.objects.get_or_create(
            circle=circle,
            invited_user=invited_user,
            defaults={
                'invited_by': request.user
            }
        )

        if not created:
            return Response(
                {'error': 'Invite already exists'},
                status=status.HTTP_400_BAD_REQUEST
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

        invite.status = 'accepted'
        invite.responded_at = timezone.now()
        invite.save()

        CircleMember.objects.create(
            circle=invite.circle,
            user=request.user,
            role='member'
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