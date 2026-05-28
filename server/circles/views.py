from rest_framework import viewsets
from .models import Circle, CircleMember
from .serializers import CircleSerializer, CircleMemberSerializer


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