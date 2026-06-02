from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Memory, MemoryPhoto
from .serializers import MemorySerializer


class MemoryViewSet(viewsets.ModelViewSet):
    serializer_class = MemorySerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
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