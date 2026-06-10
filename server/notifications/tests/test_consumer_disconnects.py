import pytest

from channels.db import database_sync_to_async
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework_simplejwt.tokens import AccessToken

from circles.models import Circle, CircleMember
from memories.models import Memory
from config.asgi import application


@database_sync_to_async
def create_user(username='disconnectuser'):
    User = get_user_model()

    return User.objects.create_user(
        username=username,
        password='password123',
    )


@database_sync_to_async
def create_memory_with_member(user):
    circle = Circle.objects.create(
        name='Disconnect Test Circle',
        circle_type='friends',
        start_date=timezone.now().date(),
        created_by=user,
    )

    CircleMember.objects.create(
        circle=circle,
        user=user,
        role='owner',
    )

    return Memory.objects.create(
        circle=circle,
        title='Disconnect Test Memory',
        description='Test description',
        memory_date=timezone.now().date(),
        created_by=user,
    )


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_notification_socket_disconnects_cleanly():
    user = await create_user()
    token = AccessToken.for_user(user)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/notifications/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is True

    await communicator.disconnect()


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_memory_comment_socket_disconnects_cleanly():
    user = await create_user()
    memory = await create_memory_with_member(user)
    token = AccessToken.for_user(user)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/memories/{memory.id}/comments/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is True

    await communicator.disconnect()