import asyncio
import pytest

from channels.testing import WebsocketCommunicator
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

from config.asgi import application
from channels.db import database_sync_to_async
from channels.layers import get_channel_layer


@database_sync_to_async
def create_user(username='socket_user'):
    User = get_user_model()

    return User.objects.create_user(
        username=username,
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

@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_notification_socket_rejects_anonymous_user():
    communicator = WebsocketCommunicator(
        application,
        '/ws/notifications/',
    )

    connected, _ = await communicator.connect()

    assert connected is False

@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_notification_socket_receives_group_message():
    user = await create_user()

    token = AccessToken.for_user(user)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/notifications/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is True

    channel_layer = get_channel_layer()

    await channel_layer.group_send(
        f'user_notifications_{user.id}',
        {
            'type': 'notification_created',
            'notification': {
                'id': 123,
                'message': 'Test notification',
                'notification_type': 'test',
            },
        },
    )

    response = await communicator.receive_json_from()

    assert response == {
        'type': 'notification_created',
        'notification': {
            'id': 123,
            'message': 'Test notification',
            'notification_type': 'test',
        },
    }

    await communicator.disconnect()


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_notification_socket_does_not_receive_other_users_messages():
    user_one = await create_user()

    User = get_user_model()

    user_two = await database_sync_to_async(
        User.objects.create_user
    )(
        username='user_two',
        password='password123',
    )

    token = AccessToken.for_user(user_one)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/notifications/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is True

    channel_layer = get_channel_layer()

    await channel_layer.group_send(
        f'user_notifications_{user_two.id}',
        {
            'type': 'notification_created',
            'notification': {
                'id': 999,
                'message': 'Wrong user',
                'notification_type': 'test',
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
async def test_notification_socket_rejects_invalid_token():
    communicator = WebsocketCommunicator(
        application,
        '/ws/notifications/?token=bad-token',
    )

    connected, _ = await communicator.connect()

    assert connected is False


@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
async def test_notification_socket_ignores_malformed_event():
    user = await create_user(username='malformed_user')
    token = AccessToken.for_user(user)

    communicator = WebsocketCommunicator(
        application,
        f'/ws/notifications/?token={token}',
    )

    connected, _ = await communicator.connect()

    assert connected is True

    channel_layer = get_channel_layer()

    await channel_layer.group_send(
        f'user_notifications_{user.id}',
        {
            'type': 'notification_created',
        },
    )

    with pytest.raises(asyncio.TimeoutError):
        await asyncio.wait_for(
            communicator.output_queue.get(),
            timeout=0.5,
        )

    await communicator.disconnect()