from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.authentication import JWTAuthentication


@database_sync_to_async
def get_user_from_token(token):
    """
    Convert a JWT access token into a Django user.

    WebSockets do not automatically use the same auth flow
    as normal API requests, so we manually validate the token.
    """

    try:
        # JWTAuthentication is the same authentication class
        # your DRF API already uses.
        jwt_authentication = JWTAuthentication()

        # Validate the raw token string.
        validated_token = jwt_authentication.get_validated_token(token)

        # Get the user connected to that token.
        return jwt_authentication.get_user(validated_token)

    except Exception:
        # If anything goes wrong, treat this connection as anonymous.
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