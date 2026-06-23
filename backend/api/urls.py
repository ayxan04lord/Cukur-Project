from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('auth/register/', views.register_view, name='register'),
    path('auth/login/',    views.login_view,    name='login'),
    path('auth/logout/',   views.logout_view,   name='logout'),
    path('auth/me/',       views.me_view,       name='me'),

    # Content (public)
    path('persons/',        views.persons_list,    name='persons-list'),
    path('seasons/',        views.seasons_list,    name='seasons-list'),
    path('slides/',         views.slides_list,     name='slides-list'),
    path('quiz/questions/', views.quiz_questions,  name='quiz-questions'),

    # Likes
    path('likes/',         views.likes_list,    name='likes-list'),
    path('likes/toggle/',  views.likes_toggle,  name='likes-toggle'),

    # Basket
    path('basket/',        views.basket_list,   name='basket-list'),
    path('basket/toggle/', views.basket_toggle, name='basket-toggle'),
]
