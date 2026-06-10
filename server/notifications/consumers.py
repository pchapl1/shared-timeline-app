import json
import logging
from channels.db import database_sync_to_async
from memories.models import Memory
from channels.generic.websocket import AsyncWebsocketConsumer

logger = logging.getLogger(__name__)


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

        logger.info(
            f'Notification WebSocket connect attempt: user={self.user}'
        )

        if self.user.is_anonymous:
            await self.close(code=4001)
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
        logger.info('Notification WebSocket connected: user_id={self.user.id}')


    async def disconnect(self, close_code):
        """
        Runs when the frontend closes or loses the WebSocket connection.
        """
        logger.info(
            f'Notification WebSocket disconnected: '
            f'user_id={getattr(self.user, "id", None)} '
            f'code={close_code}'
        )
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
        notification = event.get('notification')

        if not notification: 
            return
        
        # Send JSON data to the frontend WebSocket listener.
        await self.send(
            text_data=json.dumps({
                'type': 'notification_created',
                'notification': event['notification'],
            })
        )

@database_sync_to_async
def user_can_access_memory_comments(user, memory_id):
    return Memory.objects.filter(
        id=memory_id,
        circle__members__user=user,
    ).exists()

class MemoryCommentConsumer(AsyncWebsocketConsumer):
    """
    Handles real-time comments for one memory detail screen.

    Every user viewing the same memory joins the same group:

        memory_comments_12

    When someone adds a comment, the backend can broadcast it
    to everyone currently viewing that memory.
    """

    async def connect(self):
        """
        Runs when the frontend opens a WebSocket connection
        for a specific memory.
        """

        self.user = self.scope['user']

        logger.info(f'Memory comment WebSocket connect attempt: user={self.user}')
    
        # Only logged-in users can connect.
        if self.user.is_anonymous:
            await self.close(code=4001)
            return

        # Get the memory id from the websocket URL.
        self.memory_id = self.scope['url_route']['kwargs']['memory_id']

        can_access = await user_can_access_memory_comments(
            self.user,
            self.memory_id,
        )

        if not can_access:
            await self.close(code=4003)
            return

        # Create a group name for this memory.
        self.group_name = f'memory_comments_{self.memory_id}'

        # Add this socket connection to the memory comment group.
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name,
        )

        # Accept the socket connection.
        await self.accept()
        logger.info(
            f'Memory comment WebSocket connected: '
            f'user_id={self.user.id} '
            f'memory_id={self.memory_id}'
        )

    async def disconnect(self, close_code):
        """
        Runs when the user leaves the memory screen
        or the socket disconnects.
        """
        logger.info(
            f'Memory comment WebSocket disconnected: '
            f'user_id={getattr(self.user, "id", None)} '
            f'memory_id={getattr(self, "memory_id", None)} '
            f'code={close_code}'
        )
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name,
            )

    async def comment_created(self, event):
        """
        Runs when the backend broadcasts a newly created comment.
        """

        comment = event.get('comment')

        if not comment:
            return
        
        await self.send(
            text_data=json.dumps({
                'type': 'comment_created',
                'comment': event['comment'],
            })
        )