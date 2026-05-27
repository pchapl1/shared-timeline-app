from rest_framework.routers import DefaultRouter
from .views import CircleViewSet, CircleMemberViewSet

router = DefaultRouter()
router.register(r'circles', CircleViewSet)
router.register(r'circle-members', CircleMemberViewSet)

urlpatterns = router.urls