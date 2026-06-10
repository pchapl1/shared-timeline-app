from circles.models import CircleMember

from .models import Notification


def create_notification(
    *,
    recipient,
    actor,
    notification_type,
    circle=None,
    memory=None,
):
    """
    Create a notification for one recipient.

    WebSocket delivery is handled automatically by notifications/signals.py
    after the Notification is saved.
    """

    if recipient == actor:
        return None

    return Notification.objects.create(
        recipient=recipient,
        actor=actor,
        notification_type=notification_type,
        circle=circle,
        memory=memory,
    )


def create_circle_notification(
    *,
    circle,
    actor,
    notification_type,
    memory=None,
):
    """
    Create notifications for every member of a circle except the actor.
    """

    members = CircleMember.objects.filter(
        circle=circle
    ).exclude(
        user=actor
    ).select_related('user')

    notifications = []

    for member in members:
        notification = create_notification(
            recipient=member.user,
            actor=actor,
            notification_type=notification_type,
            circle=circle,
            memory=memory,
        )

        if notification is not None:
            notifications.append(notification)

    return notifications