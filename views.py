# app/views.py
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import Service, Case, Competency
from .serializers import ServiceSerializer, CaseSerializer, CompetencySerializer


# ViewSets для остальных моделей
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer


class CompetencyViewSet(viewsets.ModelViewSet):
    queryset = Competency.objects.all()
    serializer_class = CompetencySerializer


# View для регистрации
class RegisterView(APIView):
    """
    Регистрация нового пользователя
    """

    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # Получаем данные из запроса
            username = request.data.get('username', '').strip()
            email = request.data.get('email', '').strip()
            password = request.data.get('password', '').strip()

            # Валидация
            if not username or not email or not password:
                return Response(
                    {'error': 'Все поля обязательны для заполнения'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Проверка на существование пользователя
            if User.objects.filter(username=username).exists():
                return Response(
                    {'error': 'Пользователь с таким именем уже существует'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if User.objects.filter(email=email).exists():
                return Response(
                    {'error': 'Пользователь с таким email уже существует'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Создание пользователя
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )

            return Response({
                'message': 'Пользователь успешно зарегистрирован',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {'error': f'Ошибка сервера: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )