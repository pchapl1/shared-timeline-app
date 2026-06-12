from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Circle, CircleMember, CircleInvite


class CircleMemberSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = CircleMember
        fields = '__all__'


class CircleInviteSerializer(serializers.ModelSerializer):
    invited_by_username = serializers.CharField(
        source='invited_by.username',
        read_only=True
    )
    invited_user_username = serializers.CharField(
        source='invited_user.username',
        read_only=True
    )
    circle_name = serializers.CharField(
        source='circle.name',
        read_only=True
    )

    class Meta:
        model = CircleInvite
        fields = '__all__'
        read_only_fields = [
            'invited_by',
            'status',
            'created_at',
            'responded_at',
        ]


class CircleSerializer(serializers.ModelSerializer):
    members = CircleMemberSerializer(
        many=True,
        read_only=True
    )

    invites = CircleInviteSerializer(
        many=True,
        read_only=True
    )

    member_count = serializers.IntegerField(
        source='members.count',
        read_only=True
    )

    memory_count = serializers.IntegerField(
        source='memories.count',
        read_only=True
    )

    trip_count = serializers.IntegerField(
        source='trips.count',
        read_only=True
    )

    class Meta:
        model = Circle
        fields = [
            'id',
            'name',
            'circle_type',
            'start_date',
            'members',
            'invites',
            'member_count',
            'memory_count',
            'trip_count',
            'is_archived',
            'created_by',
        ]
        read_only_fields = ['created_by']