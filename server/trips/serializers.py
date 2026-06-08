from rest_framework import serializers

from .models import Trip


class TripSerializer(serializers.ModelSerializer):
    created_by_username = serializers.CharField(
        source='created_by.username',
        read_only=True
    )

    class Meta:
        model = Trip
        fields = '__all__'
        read_only_fields = [
            'created_by',
            'created_at',
            'updated_at',
        ]