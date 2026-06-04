from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Notification
from .serializers import NotificationSerializer


@receiver(post_save, sender=Notification)
def send_notification_websocket_event(sender, instance, created, **kwargs):
    """
    Send a WebSocket event whenever a new notification is created.

    This runs automatically after Notification.objects.create(...).

    Example:
    - User A comments on a memory
    - Backend creates a Notification for User B
    - This signal sends the notification to User B's WebSocket group
    """

    # We only want to send real-time events for brand new notifications.
    # We do NOT want to send an event every time is_read changes.
    if not created:
        return

    # Get the Channels layer.
    # This is the bridge between normal Django code and WebSockets.
    channel_layer = get_channel_layer()

    # Build the private group name for the notification recipient.
    # This must match the group name in NotificationConsumer.
    group_name = f'user_notifications_{instance.recipient_id}'

    # Convert the Notification model into JSON-friendly data.
    # We wrap it in dict() so the serializer output is plain Python data.
    notification_data = dict(NotificationSerializer(instance).data)

    # Send an event to the recipient's WebSocket group.
    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            # This maps to NotificationConsumer.notification_created(...)
            'type': 'notification_created',

            # This is the data the frontend will receive.
            'notification': notification_data,
        }
    )