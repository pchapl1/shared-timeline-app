"""
ASGI configuration for the Shared Timeline app.

ASGI lets Django handle both:
- normal HTTP requests
- WebSocket connections
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

from config.middleware import JWTAuthMiddleware
from notifications.routing import websocket_urlpatterns

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'config.settings'
)

# This handles normal Django/DRF HTTP requests.
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    # Normal API/browser requests go here.
    'http': django_asgi_app,

    # WebSocket requests go here.
    # JWTAuthMiddleware reads the token from the URL
    # and adds the logged-in user to scope['user'].
    'websocket': JWTAuthMiddleware(
        URLRouter(websocket_urlpatterns)
    ),
})