from rest_framework import serializers
from django.contrib.auth.models import User
from .models import LikedItem, BasketItem, Person, Season, SliderSlide, QuizQuestion


# ─── AUTH ─────────────────────────────────────────────────────────────────────

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Bu e-poçt artıq qeydiyyatdan keçib.')
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Bu istifadəçi adı artıq mövcuddur.')
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


# ─── CONTENT ──────────────────────────────────────────────────────────────────

class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = ('id', 'num', 'year', 'episodes', 'image', 'link', 'desc')


class SliderSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = SliderSlide
        fields = ('id', 'image', 'label', 'year', 'link', 'order')


class PersonSerializer(serializers.ModelSerializer):
    # seasons → sadəcə num list: [1, 2, 3]
    seasons = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = (
            'id', 'actor_name', 'role_name', 'image',
            'wikipedia', 'role_info', 'role_type', 'seasons',
        )

    def get_seasons(self, obj):
        return list(obj.seasons.values_list('num', flat=True).order_by('num'))


class QuizQuestionSerializer(serializers.ModelSerializer):
    difficulty_label = serializers.CharField(source='get_difficulty_display', read_only=True)
    category_label   = serializers.CharField(source='get_category_display',   read_only=True)

    class Meta:
        model  = QuizQuestion
        fields = (
            'id', 'question',
            'option_a', 'option_b', 'option_c', 'option_d',
            'correct', 'difficulty', 'difficulty_label',
            'category', 'category_label', 'explanation',
        )


# ─── USER DATA ────────────────────────────────────────────────────────────────

class LikedItemSerializer(serializers.ModelSerializer):
    person_id = serializers.IntegerField(source='person.id', read_only=True)

    class Meta:
        model = LikedItem
        fields = ('person_id', 'created_at')


class BasketItemSerializer(serializers.ModelSerializer):
    person_id = serializers.IntegerField(source='person.id', read_only=True)

    class Meta:
        model = BasketItem
        fields = ('person_id', 'created_at')
