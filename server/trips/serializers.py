from rest_framework import serializers

from .models import Trip


class TripSerializer(serializers.ModelSerializer):
    created_by_username = serializers.CharField(
        source='created_by.username',
        read_only=True
    )

    memory_count = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = [
            'id',
            'circle',
            'title',
            'description',
            'start_date',
            'end_date',
            'destination_name',
            'latitude',
            'longitude',
            'created_by',
            'created_by_username',
            'created_at',
            'updated_at',
            'memory_count',
        ]

        read_only_fields = [
            'created_by',
            'created_at',
            'updated_at',
            'memory_count',
        ]

    def validate_circle(self, circle):
        request = self.context['request']

        is_member = circle.members.filter(
            user=request.user
        ).exists()

        if not is_member:
            raise serializers.ValidationError(
                'You are not a member of this circle.'
            )

        return circle
    
    def get_memory_count(self, obj):
        return obj.memories.count()
    
