from django.urls import path

from .consumers import NotificationConsumer, MemoryCommentConsumer


# =====================================================
# WebSocket URL Patterns
#
# These are like normal Django URL patterns, but they are
# for WebSocket connections instead of HTTP requests.
#
# The frontend will eventually connect to:
#
#   ws://127.0.0.1:8000/ws/notifications/
# =====================================================
websocket_urlpatterns = [
    path(
        'ws/notifications/',
        NotificationConsumer.as_asgi(),
    ),
        path(
        'ws/memories/<int:memory_id>/comments/',
        MemoryCommentConsumer.as_asgi(),
    ),
]