from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Activity
from .serializers import ActivitySerializer


class ActivityViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Activity.objects.filter(
            circle__members__user=self.request.user
        ).select_related(
            'actor',
            'circle',
            'memory',
            'comment',
        ).distinct().order_by('-created_at')