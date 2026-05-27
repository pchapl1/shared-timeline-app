from rest_framework.routers import DefaultRouter
from .views import MemoryViewSet

router = DefaultRouter()
router.register(r'memories', MemoryViewSet)

urlpatterns = router.urls