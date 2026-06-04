import json

from channels.generic.websocket import AsyncWebsocketConsumer


class NotificationConsumer(AsyncWebsocketConsumer):
    """
    Handles real-time notification updates for one connected user.

    Each logged-in user will eventually join their own private
    notification group, like:

        user_notifications_5

    That lets the backend send a notification update only to
    the user who should receive it.
    """

    async def connect(self):
        """
        Runs when the frontend opens a WebSocket connection.
        """

        self.user = self.scope['user']

        # For now, reject anonymous users.
        # Later this depends on WebSocket auth working correctly.
        if self.user.is_anonymous:
            await self.close()
            return

        # Create a unique group name for this user.
        self.group_name = f'user_notifications_{self.user.id}'

        # Add this WebSocket connection to the user's group.
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name,
        )

        # Accept the WebSocket connection.
        await self.accept()

    async def disconnect(self, close_code):
        """
        Runs when the frontend closes or loses the WebSocket connection.
        """

        # Remove this WebSocket connection from the user's group.
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name,
            )

    async def notification_created(self, event):
        """
        Runs when the backend sends a notification_created event
        to this user's WebSocket group.
        """

        # Send JSON data to the frontend WebSocket listener.
        await self.send(
            text_data=json.dumps({
                'type': 'notification_created',
                'notification': event['notification'],
            })
        )