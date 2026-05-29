from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Memory
from .serializers import MemorySerializer


class MemoryViewSet(viewsets.ModelViewSet):
    serializer_class = MemorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Memory.objects.filter(
            circle__members=self.request.user
        ).order_by('-memory_date', '-created_at')

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)