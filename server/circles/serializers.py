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

    class Meta:
        model = Circle
        fields = '__all__'
        read_only_fields = ['created_by']