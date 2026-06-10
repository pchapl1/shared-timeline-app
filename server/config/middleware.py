import logging
from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

logger = logging.getLogger(__name__)


@database_sync_to_async
def get_user_from_token(token):
    try:
        jwt_authentication = JWTAuthentication()
        validated_token = jwt_authentication.get_validated_token(token)
        user = jwt_authentication.get_user(validated_token)

        if not user or not user.is_active:
            return AnonymousUser()

        return user

    except (InvalidToken, TokenError):
        return AnonymousUser()

    except Exception:
        logger.exception('Unexpected WebSocket authentication error')
        return AnonymousUser()

class JWTAuthMiddleware:
    """
    Custom WebSocket middleware for JWT authentication.

    It reads the token from the WebSocket query string:

        ws://127.0.0.1:8000/ws/notifications/?token=abc123

    Then it adds the authenticated user to:

        scope['user']

    That lets Consumers access:

        self.scope['user']
    """

    def __init__(self, app):
        # Store the next ASGI app in the middleware chain.
        self.app = app

    async def __call__(self, scope, receive, send):
        # Start as anonymous by default.
        scope['user'] = AnonymousUser()

        # query_string comes in as bytes, so we decode it first.
        query_string = scope.get('query_string', b'').decode()

        # Convert "token=abc123" into {"token": ["abc123"]}.
        query_params = parse_qs(query_string)

        # Grab the first token value if it exists.
        token = query_params.get('token', [None])[0]

        if token:
            # Validate the JWT and attach the user to the scope.
            scope['user'] = await get_user_from_token(token)

            

        # Continue to the WebSocket router/consumer.
        return await self.app(scope, receive, send)