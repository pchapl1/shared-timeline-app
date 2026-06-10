import pytest

from channels.testing import WebsocketCommunicator
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

from config.asgi import application
from channels.db import database_sync_to_async


@database_sync_to_async
def create_user():
    User = get_user_model()

    return User.objects.create_user(
        username='socketuser',
        password='password123',
    )


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_notification_socket_connects_for_authenticated_user():
    user = await create_user()

    token = AccessToken.for_user(user)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/notifications/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is True

    await communicator.disconnect()