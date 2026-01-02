# app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import ServiceViewSet, CaseViewSet, CompetencyViewSet, RegisterView

# Создаем router для ViewSets
router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'cases', CaseViewSet, basename='case')
router.register(r'competencies', CompetencyViewSet, basename='competency')

# URL patterns

urlpatterns = [
    path('', include(router.urls)),  # включает все пути из router
    path('register/', RegisterView.as_view(), name='register'),  # отдельный путь для регистрации
    path('token/', TokenObtainPairView.as_view(), name='token_obtain'),

]