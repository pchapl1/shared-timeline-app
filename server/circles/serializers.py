from rest_framework import serializers
from .models import Circle, CircleMember 

class CircleMemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = CircleMember
        fields = '__all__'

class CircleSerializer(serializers.ModelSerializer):

    members = CircleMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Circle
        fields = '__all__'