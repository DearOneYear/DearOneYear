from django.shortcuts import render
from django.views import View


# from django.contrib.auth.models import User
from letter.models import Letter
from accounts.models import User
from .serializers import LetterSerializer
# Response code
from django.shortcuts import get_object_or_404
# API View
from rest_framework.views import APIView
from rest_framework.response import Response #response
from rest_framework import status
from rest_framework.parsers import JSONParser



# Create your views here.
class LetterList(APIView):

    def get(self, request):
        author = User.objects.get(user = request.user)
        letters = Letter.objects.filter(author=author)
        serializer = LetterSerializer(letters, many = True)
        return Response(serializer.data)

    def post(self, request):
        author = User.objects.get(user=request.user)

        # request에서 data 받아서 편지에 넣는다
        serializer = LetterSerializer
        if serializer.is_valid():
            serializer.save(author = author)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class LetterDetail(APIView):
    def get_object(self, pk):
        return get_object_or_404(Letter, pk=pk)
        
    def get(self, request, pk):
        letter = self.get_object(pk);
        serializer = LetterSerializer(letter)
        return Response(serializer.data)
    def post(self, request, pk):
        letter = self.get_object(pk);
        serializer = LetterSerializer(letter, data={'isOpened':True}, partial = True);
        if serializer.is_valid():
            serializer.isOpened = True
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    # edit, delete is not allowed

# class LetterResult(APIView):
