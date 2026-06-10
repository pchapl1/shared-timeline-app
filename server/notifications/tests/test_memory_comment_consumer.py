import asyncio
import pytest

from channels.db import database_sync_to_async
from channels.layers import get_channel_layer
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework_simplejwt.tokens import AccessToken

from circles.models import Circle, CircleMember
from memories.models import Memory
from config.asgi import application


@database_sync_to_async
def create_user(username='commentuser'):
    User = get_user_model()

    return User.objects.create_user(
        username=username,
        password='password123',
    )


@database_sync_to_async
def create_memory_with_member(user):
    circle = Circle.objects.create(
        name='Test Circle',
        circle_type='friends',
        start_date=timezone.now().date(),
        created_by=user,
    )

    CircleMember.objects.create(
        circle=circle,
        user=user,
        role='owner',
    )

    memory = Memory.objects.create(
        circle=circle,
        title='Test Memory',
        description='Test description',
        memory_date=timezone.now().date(),
        created_by=user,
    )

    return memory


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_memory_comment_socket_connects_for_circle_member():
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


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_memory_comment_socket_rejects_anonymous_user():
    communicator = WebsocketCommunicator(
        application,
        '/ws/memories/1/comments/',
    )

    connected, _ = await communicator.connect()

    assert connected is False


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_memory_comment_socket_rejects_non_circle_member():
    owner = await create_user(username='owner')
    outsider = await create_user(username='outsider')

    memory = await create_memory_with_member(owner)

    token = AccessToken.for_user(outsider)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/memories/{memory.id}/comments/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is False


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_memory_comment_socket_rejects_missing_memory():
    user = await create_user()
    token = AccessToken.for_user(user)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/memories/999999/comments/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is False


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_memory_comment_socket_receives_group_message():
    user = await create_user()
    memory = await create_memory_with_member(user)

    token = AccessToken.for_user(user)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/memories/{memory.id}/comments/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is True

    channel_layer = get_channel_layer()

    await channel_layer.group_send(
        f'memory_comments_{memory.id}',
        {
            'type': 'comment_created',
            'comment': {
                'id': 123,
                'content': 'Test comment',
                'created_by_username': 'commentuser',
            },
        },
    )

    response = await communicator.receive_json_from()

    assert response == {
        'type': 'comment_created',
        'comment': {
            'id': 123,
            'content': 'Test comment',
            'created_by_username': 'commentuser',
        },
    }

    await communicator.disconnect()


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_memory_comment_socket_does_not_receive_other_memory_comments():
    user = await create_user()
    memory_one = await create_memory_with_member(user)
    memory_two = await create_memory_with_member(user)

    token = AccessToken.for_user(user)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/memories/{memory_one.id}/comments/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is True

    channel_layer = get_channel_layer()

    await channel_layer.group_send(
        f'memory_comments_{memory_two.id}',
        {
            'type': 'comment_created',
            'comment': {
                'id': 999,
                'content': 'Wrong memory comment',
                'created_by_username': 'commentuser',
            },
        },
    )

    with pytest.raises(asyncio.TimeoutError):
        await asyncio.wait_for(
            communicator.output_queue.get(),
            timeout=0.5,
        )

    await communicator.disconnect()


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_memory_comment_socket_ignores_malformed_event():
    user = await create_user()
    memory = await create_memory_with_member(user)

    token = AccessToken.for_user(user)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/memories/{memory.id}/comments/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is True

    channel_layer = get_channel_layer()

    await channel_layer.group_send(
        f'memory_comments_{memory.id}',
        {
            'type': 'comment_created',
        },
    )

    with pytest.raises(asyncio.TimeoutError):
        await asyncio.wait_for(
            communicator.output_queue.get(),
            timeout=0.5,
        )

    await communicator.disconnect()