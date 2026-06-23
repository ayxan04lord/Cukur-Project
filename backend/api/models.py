from django.db import models
from django.contrib.auth.models import User


# ─── CONTENT ──────────────────────────────────────────────────────────────────

class Season(models.Model):
    num      = models.PositiveIntegerField(unique=True)
    year     = models.CharField(max_length=20)
    episodes = models.PositiveIntegerField()
    image    = models.CharField(max_length=255)
    link     = models.URLField(max_length=500)
    desc     = models.TextField()

    class Meta:
        ordering = ['num']

    def __str__(self):
        return f"Mövsüm {self.num}"


class SliderSlide(models.Model):
    season = models.OneToOneField(Season, on_delete=models.CASCADE,
                                  related_name='slide', null=True, blank=True)
    image  = models.CharField(max_length=255)
    label  = models.CharField(max_length=50)
    year   = models.CharField(max_length=10)
    link   = models.URLField(max_length=500)
    order  = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label


class Person(models.Model):
    ROLE_CHOICES = [
        ('protagonist', 'Qəhrəman'),
        ('antagonist',  'Antagonist'),
    ]
    actor_name = models.CharField(max_length=150)
    role_name  = models.CharField(max_length=150)
    image      = models.CharField(max_length=255)
    wikipedia  = models.URLField(max_length=500, blank=True)
    role_info  = models.TextField()
    role_type  = models.CharField(max_length=20, choices=ROLE_CHOICES)
    seasons    = models.ManyToManyField(Season, related_name='persons', blank=True)
    order      = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.actor_name} ({self.role_name})"


class QuizQuestion(models.Model):
    """Çukur serial bilgi yarışması sualları."""

    DIFFICULTY_CHOICES = [
        ('easy',   'Asan'),
        ('medium', 'Orta'),
        ('hard',   'Çətin'),
    ]
    CATEGORY_CHOICES = [
        ('characters', 'Personajlar'),
        ('events',     'Hadisələr'),
        ('family',     'Koçovalı Ailəsi'),
        ('enemies',    'Düşmənlər'),
        ('romance',    'Sevgi Xətləri'),
        ('general',    'Ümumi'),
    ]

    question    = models.TextField()
    option_a    = models.CharField(max_length=300)
    option_b    = models.CharField(max_length=300)
    option_c    = models.CharField(max_length=300)
    option_d    = models.CharField(max_length=300)
    correct     = models.CharField(max_length=1,
                      choices=[('A','A'),('B','B'),('C','C'),('D','D')])
    difficulty  = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='medium')
    category    = models.CharField(max_length=20, choices=CATEGORY_CHOICES,   default='general')
    explanation = models.TextField(blank=True)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['difficulty', 'category']

    def __str__(self):
        return f"[{self.get_difficulty_display()}] {self.question[:70]}"


# ─── USER DATA ────────────────────────────────────────────────────────────────

class LikedItem(models.Model):
    user       = models.ForeignKey(User,   on_delete=models.CASCADE, related_name='liked_items')
    person     = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='liked_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'person')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} → ♥ {self.person.role_name}"


class BasketItem(models.Model):
    user       = models.ForeignKey(User,   on_delete=models.CASCADE, related_name='basket_items')
    person     = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='in_basket_of')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'person')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} → 🛒 {self.person.role_name}"
