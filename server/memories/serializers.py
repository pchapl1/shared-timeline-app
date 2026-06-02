from rest_framework import serializers

from .models import Memory, MemoryPhoto


class MemoryPhotoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = MemoryPhoto
        fields = ['id', 'image', 'created_at']

    def get_image(self, obj):
        request = self.context.get('request')

        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)

        return None

class MemorySerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    photos = MemoryPhotoSerializer(many=True, read_only=True)
    created_by = serializers.SerializerMethodField()

    class Meta:
        model = Memory
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def get_created_by(self, obj):
        if not obj.created_by:
            return None

        return {
            'id': obj.created_by.id,
            'username': obj.created_by.username,
        }

    def get_photo(self, obj):
        request = self.context.get('request')

        if obj.photo and request:
            return request.build_absolute_uri(obj.photo.url)

        return None