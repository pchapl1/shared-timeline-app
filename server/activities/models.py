from django.conf import settings
from django.db import models


class Activity(models.Model):
    MEMORY_CREATED = 'memory_created'
    COMMENT_CREATED = 'comment_created'
    REACTION_CREATED = 'reaction_created'
    MEMBER_JOINED = 'member_joined'

    ACTIVITY_TYPES = [
        (MEMORY_CREATED, 'Memory created'),
        (COMMENT_CREATED, 'Comment created'),
        (REACTION_CREATED, 'Reaction created'),
        (MEMBER_JOINED, 'Member joined'),
    ]

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='activities'
    )
    circle = models.ForeignKey(
        'circles.Circle',
        on_delete=models.CASCADE,
        related_name='activities'
    )
    activity_type = models.CharField(
        max_length=50,
        choices=ACTIVITY_TYPES
    )
    memory = models.ForeignKey(
        'memories.Memory',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='activities'
    )
    comment = models.ForeignKey(
        'memories.MemoryComment',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='activities'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']