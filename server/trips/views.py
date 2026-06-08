from rest_framework import viewsets

from .models import Trip
from .serializers import TripSerializer


class TripViewSet(viewsets.ModelViewSet):
    serializer_class = TripSerializer

    def get_queryset(self):
        # Users can only see trips for circles they belong to.
        return Trip.objects.filter(
            circle__members__user=self.request.user
        ).distinct()

    def perform_create(self, serializer):
        # created_by should always come from the authenticated user,
        # not from frontend-submitted data.
        serializer.save(created_by=self.request.user)