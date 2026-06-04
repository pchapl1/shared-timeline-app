from rest_framework import serializers

from .models import Activity


class ActivitySerializer(serializers.ModelSerializer):
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
        model = Activity
        fields = [
            'id',
            'actor',
            'actor_username',
            'circle',
            'circle_name',
            'activity_type',
            'memory',
            'memory_title',
            'comment',
            'created_at',
        ]