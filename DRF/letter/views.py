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
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
# time
from datetime import datetime
from datetime import timedelta
import datetime
from pytz import timezone, utc

# Create your views here.
class LetterList(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request):
        author = User.objects.get(email = request.user)
        letters = Letter.objects.filter(author=author)
        serializer = LetterSerializer(letters, many = True)
        return Response(serializer.data)

    def post(self, request):
        author = User.objects.get(user=request.user)
        # request에서 data 받아서 편지에 넣는다
        serializer = LetterSerializer(data = request.data)

        # image 확장자 검사
        if request.FILES['image']:
            image = request.FILES['image']
            allowed_ext = ['jpg', 'jpeg', 'png', 'gif']
            ext = str(request.FILES['image']).split('.')[-1].lower()

            if not ext in allowed_ext:
                return Response({"msg":'허용된 확장자가 아닙니다.'}, staus = status.HTTP_400_BAD_REQUEST)
            
            serializer.image = image # image 넘어온 경우에만 serializer에 추가
        
        if serializer.is_valid():
            serializer.save(author = author)            
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class LetterDetail(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_object(self, pk):
        return get_object_or_404(Letter, pk=pk)
    def get_now(self):
        KST = timezone('Asia/Seoul')
        now = datetime.datetime.utcnow()
        localNow = utc.localize(now).astimezone(KST)
        return localNow
    def days_hours_minutes(self, td):
        return td.days, td.seconds//3600, (td.seconds//60)%60

    def get(self, request, pk):
        letter = self.get_object(pk);
        print(type(letter.openAt))
        print(type(self.get_now()))
        
        #dday=letter.openAt - self.get_now()
        openDay = letter.openAt.replace(tzinfo=None)
        dday = openDay - datetime.datetime.now()
        print(dday)
        [tday, thour, tminute] = self.days_hours_minutes(dday)

        if dday.days > 0 or thour > 0 or tminute > 0 or dday.seconds > 0:
            #날짜 남은 것
            return Response({"msg": "아직!", "remaining_days":str(dday.days), "open_date" : self.get_now()})

        serializer = LetterSerializer(letter)
        return Response(serializer.data, status = status.HTTP_200_OK)

    # edit, delete is not allowed

# class LetterResult(APIView):
