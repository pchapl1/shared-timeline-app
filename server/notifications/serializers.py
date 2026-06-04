from rest_framework import serializers

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    actor_username = serializers.CharField(
        source='actor.username',
        read_only=True
    )
    circle_name = serializers.CharField(
        source='circle.name',
        read_only=True
    )
    memory_title = serializers.CharField(
        source='memory.title',
        read_only=True
    )

    class Meta:
        model = Notification
        fields = [
            'id',
            'recipient',
            'actor',
            'actor_username',
            'notification_type',
            'is_read',
            'circle',
            'circle_name',
            'memory',
            'memory_title',
            'created_at',
        ]