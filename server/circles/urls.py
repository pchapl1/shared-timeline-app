from rest_framework.routers import DefaultRouter
from .views import CircleViewSet, CircleMemberViewSet, CircleInviteViewSet

router = DefaultRouter()
router.register(r'circles', CircleViewSet, basename='circle')
router.register(r'circle-members', CircleMemberViewSet, basename='circle-member')
router.register(r'circle-invites', CircleInviteViewSet, basename='circle-invite')

urlpatterns = router.urls