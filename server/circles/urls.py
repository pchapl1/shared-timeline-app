from rest_framework.routers import DefaultRouter
from .views import CircleViewSet, CircleMemberViewSet

router = DefaultRouter()
router.register(r'circles', CircleViewSet, basename='circle')
router.register(r'circle-members', CircleMemberViewSet, basename='circle-member')

urlpatterns = router.urls