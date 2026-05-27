from rest_framework import viewsets
from .models import Circle, CircleMember 
from .serializers import CircleSerializer, CircleMemberSerializer

class CircleViewSet(viewsets.ModelViewSet):
    queryset = Circle.objects.all()
    serializer_class = CircleSerializer

class CircleMemberViewSet(viewsets.ModelViewSet):
    queryset = CircleMember.objects.all()
    serializer_class = CircleMemberSerializer

    