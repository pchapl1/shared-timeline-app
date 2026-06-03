from rest_framework import serializers

from .models import Memory, MemoryPhoto, MemoryComment 


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

class MemoryCommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = MemoryComment
        fields = [
            'id',
            'memory',
            'user',
            'content',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'memory',
            'user',
            'created_at',
            'updated_at',
        ]

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
        }

class MemorySerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    photos = MemoryPhotoSerializer(many=True, read_only=True)
    comments = MemoryCommentSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()
    reaction_count = serializers.SerializerMethodField()
    has_reacted = serializers.SerializerMethodField()

    class Meta:
        model = Memory
        fields = '__all__'
        read_only_fields = [
            'created_by',
            'created_at',
            'updated_at',
            'reaction_count',
            'has_reacted',
            'comment_count',
        ]

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

    def get_reaction_count(self, obj):
        return obj.reactions.count()

    def get_has_reacted(self, obj):
        request = self.context.get('request')

        if not request or not request.user.is_authenticated:
            return False

        return obj.reactions.filter(
            user=request.user,
            reaction_type='like'
        ).exists()
    
    def get_comment_count(self, obj):
        return obj.comments.count()