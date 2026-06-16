from rest_framework import serializers

from .models import Trip


class TripPreviewPhotoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')

        if not obj.image:
            return None

        image_url = obj.image.url

        if request:
            return request.build_absolute_uri(image_url)

        return image_url


class TripSerializer(serializers.ModelSerializer):
    created_by_username = serializers.CharField(
        source='created_by.username',
        read_only=True
    )

    memory_count = serializers.SerializerMethodField()
    preview_photos = serializers.SerializerMethodField()

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
            'preview_photos',
        ]

        read_only_fields = [
            'created_by',
            'created_at',
            'updated_at',
            'memory_count',
            'preview_photos',
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

    def get_preview_photos(self, obj):
        photos = []

        for memory in obj.memories.all():
            if memory.photos.exists():
                photos.extend(memory.photos.all()[:4])

            elif memory.photo:
                photos.append(memory)

            if len(photos) >= 4:
                break

        return TripPreviewPhotoSerializer(
            photos[:4],
            many=True,
            context=self.context
        ).data