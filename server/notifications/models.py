from django.conf import settings
from django.db import models


class Notification(models.Model):
    MEMORY_COMMENT = 'memory_comment'
    MEMORY_REACTION = 'memory_reaction'
    CIRCLE_INVITE = 'circle_invite'
    MEMBER_JOINED = 'member_joined'

    NOTIFICATION_TYPES = [
        (MEMORY_COMMENT, 'Memory Comment'),
        (MEMORY_REACTION, 'Memory Reaction'),
        (CIRCLE_INVITE, 'Circle Invite'),
        (MEMBER_JOINED, 'Member Joined'),
    ]

    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications'
    )

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications_created'
    )

    notification_type = models.CharField(
        max_length=50,
        choices=NOTIFICATION_TYPES
    )

    is_read = models.BooleanField(default=False)

    circle = models.ForeignKey(
        'circles.Circle',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    memory = models.ForeignKey(
        'memories.Memory',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']