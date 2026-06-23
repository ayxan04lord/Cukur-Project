from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .models import LikedItem, BasketItem, Person, Season, SliderSlide, QuizQuestion
from .serializers import (
    RegisterSerializer, UserSerializer,
    PersonSerializer, SeasonSerializer, SliderSlideSerializer,
    QuizQuestionSerializer,
)


# ─── AUTH ─────────────────────────────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {'token': token.key, 'user': UserSerializer(user).data},
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email', '').strip()
    password = request.data.get('password', '')
    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {'detail': 'E-poçt və ya şifrə yanlışdır.'},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    user = authenticate(request, username=user_obj.username, password=password)
    if user is None:
        return Response(
            {'detail': 'E-poçt və ya şifrə yanlışdır.'},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'user': UserSerializer(user).data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.user.auth_token.delete()
    return Response({'detail': 'Uğurla çıxış edildi.'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    return Response(UserSerializer(request.user).data)


# ─── CONTENT (public) ─────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([AllowAny])
def persons_list(request):
    """Bütün personajları qaytar — public endpoint."""
    persons = Person.objects.prefetch_related('seasons').all()
    return Response(PersonSerializer(persons, many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def seasons_list(request):
    """Bütün mövsümləri qaytar — public endpoint."""
    seasons = Season.objects.all()
    return Response(SeasonSerializer(seasons, many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def slides_list(request):
    """Slider məlumatlarını qaytar — public endpoint."""
    slides = SliderSlide.objects.all()
    return Response(SliderSlideSerializer(slides, many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def quiz_questions(request):
    """
    Quiz suallarını qaytar.
    Query params:
      ?difficulty=easy|medium|hard  (optional)
      ?category=characters|events|...  (optional)
      ?limit=10  (default 10, max 50)
    """
    qs = QuizQuestion.objects.filter(is_active=True)

    difficulty = request.query_params.get('difficulty')
    if difficulty:
        qs = qs.filter(difficulty=difficulty)

    category = request.query_params.get('category')
    if category:
        qs = qs.filter(category=category)

    try:
        limit = min(int(request.query_params.get('limit', 10)), 50)
    except ValueError:
        limit = 10

    # Təsadüfi sıralama
    qs = list(qs)
    import random
    random.shuffle(qs)
    qs = qs[:limit]

    return Response(QuizQuestionSerializer(qs, many=True).data)


# ─── LIKES ────────────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def likes_list(request):
    ids = list(
        LikedItem.objects.filter(user=request.user)
        .values_list('person_id', flat=True)
    )
    return Response({'liked': ids})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def likes_toggle(request):
    person_id = request.data.get('person_id')
    if person_id is None:
        return Response({'detail': 'person_id tələb olunur.'}, status=400)
    try:
        person = Person.objects.get(pk=person_id)
    except Person.DoesNotExist:
        return Response({'detail': 'Personaj tapılmadı.'}, status=404)

    obj, created = LikedItem.objects.get_or_create(user=request.user, person=person)
    if not created:
        obj.delete()
        return Response({'liked': False, 'person_id': person_id})
    return Response({'liked': True, 'person_id': person_id})


# ─── BASKET ───────────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def basket_list(request):
    ids = list(
        BasketItem.objects.filter(user=request.user)
        .values_list('person_id', flat=True)
    )
    return Response({'basket': ids})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def basket_toggle(request):
    person_id = request.data.get('person_id')
    if person_id is None:
        return Response({'detail': 'person_id tələb olunur.'}, status=400)
    try:
        person = Person.objects.get(pk=person_id)
    except Person.DoesNotExist:
        return Response({'detail': 'Personaj tapılmadı.'}, status=404)

    obj, created = BasketItem.objects.get_or_create(user=request.user, person=person)
    if not created:
        obj.delete()
        return Response({'inBasket': False, 'person_id': person_id})
    return Response({'inBasket': True, 'person_id': person_id})
