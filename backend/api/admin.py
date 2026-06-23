from django.contrib import admin
from .models import Season, SliderSlide, Person, LikedItem, BasketItem, QuizQuestion


@admin.register(Season)
class SeasonAdmin(admin.ModelAdmin):
    list_display  = ('num', 'year', 'episodes')
    ordering      = ('num',)


@admin.register(SliderSlide)
class SliderSlideAdmin(admin.ModelAdmin):
    list_display  = ('label', 'year', 'order', 'season')
    ordering      = ('order',)


class PersonSeasonInline(admin.TabularInline):
    model  = Person.seasons.through
    extra  = 0
    verbose_name        = 'Mövsüm'
    verbose_name_plural = 'Mövsümlər'


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display   = ('actor_name', 'role_name', 'role_type', 'order')
    list_filter    = ('role_type', 'seasons')
    search_fields  = ('actor_name', 'role_name')
    ordering       = ('order',)
    inlines        = [PersonSeasonInline]
    exclude        = ('seasons',)


@admin.register(LikedItem)
class LikedItemAdmin(admin.ModelAdmin):
    list_display  = ('user', 'person', 'created_at')
    list_filter   = ('user',)
    raw_id_fields = ('person',)


@admin.register(BasketItem)
class BasketItemAdmin(admin.ModelAdmin):
    list_display  = ('user', 'person', 'created_at')
    list_filter   = ('user',)
    raw_id_fields = ('person',)


@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display   = ('short_question', 'difficulty', 'category', 'correct', 'is_active')
    list_filter    = ('difficulty', 'category', 'is_active')
    search_fields  = ('question',)
    list_editable  = ('is_active',)
    ordering       = ('difficulty', 'category')

    fieldsets = (
        ('Sual', {
            'fields': ('question', 'difficulty', 'category', 'is_active')
        }),
        ('Variantlar', {
            'fields': ('option_a', 'option_b', 'option_c', 'option_d', 'correct')
        }),
        ('Əlavə', {
            'fields': ('explanation',),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Sual')
    def short_question(self, obj):
        return obj.question[:80] + ('...' if len(obj.question) > 80 else '')
