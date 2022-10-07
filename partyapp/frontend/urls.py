from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name=''),
    path('create', index),
    path('join', index),
    path('room/<str:roomCode>', index),
]
