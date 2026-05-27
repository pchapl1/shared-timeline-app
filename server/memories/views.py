from rest_framework import viewsets
from .models import Memory
from .serializers import MemorySerializer

class MemoryViewSet(viewsets.ModelViewSet):
    queryset = Memory.objects.all()
    serializer_class = MemorySerializer

    