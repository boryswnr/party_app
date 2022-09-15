from http.client import HTTPResponse
from django.shortcuts import render
from rest_framework import generics
from .serializer import RoomSerializer
from .models import Room

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
