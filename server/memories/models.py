from django.db import models
from django.contrib.auth.models import User
from circles.models import Circle
from trips.models import Trip


class Memory(models.Model):
    circle = models.ForeignKey(
        Circle,
        on_delete=models.CASCADE,
        related_name='memories'
    )

    trip = models.ForeignKey(Trip, on_delete=models.SET_NULL, related_name='memories', null=True, blank=True)

    title = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    memory_date = models.DateField()

    location_name = models.CharField(
        max_length=255,
        blank=True
    )

    photo = models.ImageField(
        upload_to='memories/photos/',
        null=True,
        blank=True
    )

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_memories'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class MemoryPhoto(models.Model):
    memory = models.ForeignKey(Memory, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='memories/photos/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Photo for {self.memory.title}'
    
class MemoryReaction(models.Model):
    memory = models.ForeignKey(
        Memory,
        on_delete=models.CASCADE,
        related_name='reactions'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='memory_reactions'
    )

    reaction_type = models.CharField(
        max_length=20,
        default='like'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('memory', 'user', 'reaction_type')

    def __str__(self):
        return f'{self.user.username} reacted to {self.memory.title}'
    
class MemoryComment(models.Model):
    memory = models.ForeignKey(
        Memory,
        on_delete=models.CASCADE,
        related_name='comments'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='memory_comments'
    )

    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'Comment by {self.user.username} on {self.memory.title}'