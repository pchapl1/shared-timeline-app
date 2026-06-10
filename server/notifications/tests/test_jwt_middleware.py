import pytest
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken

from config.middleware import get_user_from_token


@database_sync_to_async
def create_user(**kwargs):
    User = get_user_model()

    return User.objects.create_user(**kwargs)


@pytest.mark.django_db
@pytest.mark.asyncio
async def test_get_user_from_valid_token():
    user = await create_user(
        username='testuser',
        password='password123',
    )

    token = AccessToken.for_user(user)

    result = await get_user_from_token(str(token))

    assert result.id == user.id
    assert result.is_authenticated


@pytest.mark.django_db
@pytest.mark.asyncio
async def test_get_user_from_invalid_token_returns_anonymous():
    result = await get_user_from_token('bad-token')

    assert isinstance(result, AnonymousUser)
    assert result.is_anonymous


@pytest.mark.django_db
@pytest.mark.asyncio
async def test_get_user_from_inactive_user_returns_anonymous():
    user = await create_user(
        username='inactiveuser',
        password='password123',
        is_active=False,
    )

    token = AccessToken.for_user(user)

    result = await get_user_from_token(str(token))

    assert isinstance(result, AnonymousUser)
    assert result.is_anonymous