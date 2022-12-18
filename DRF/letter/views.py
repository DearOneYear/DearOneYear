from django.shortcuts import render
from django.views import View


# from django.contrib.auth.models import User
from letter.models import Letter
from accounts.models import User
from .serializers import (LetterSerializer, LetterDelieverySerializer,)
# Response code
from django.shortcuts import get_object_or_404
# API View
from rest_framework.views import APIView
from rest_framework.response import Response #response
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
# time
from datetime import datetime
from datetime import timedelta
import datetime
from pytz import timezone, utc
import json
# Create your views here.
class LetterList(APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        # print("\n\n\n<request.headers>")
        # for a in request.headers:
        #    print(a)
        # print("\n\n\n<request.META>")            
        # for a in request.META:
        #     print(a)
        # print("EMAIL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        # print(request.headers.get('email'))
        user_email = request.headers.get('email').split(' ')[-1]
        # print(user_email)
        author = User.objects.filter(email = user_email)[0]
        letters = Letter.objects.filter(author=author)
        ddays = []
        for letter in letters:
            openDay = letter.openAt.replace(tzinfo=None)
            dday = openDay - datetime.datetime.now()
            print(dday.days)
            ddays.append(dday.days)
        serializer = LetterSerializer(letters, many = True)
        return Response(data = {"letter":serializer.data, "ddays":ddays})

    def post(self, request):
        data = request.data.dict()
        print(data)
        if data.get('from_name')=='' or data.get('to_name')=='':
            data['from_name'] = "나"
            data['to_name'] = "나"

        author = User.objects.filter(email = data['email'])[0]
        openDay = datetime.datetime.strptime(data['openAt'], "%Y-%m-%d").replace(tzinfo=None)
        
        calc_dday = openDay - datetime.datetime.now()

        travel_day = calc_dday.days + 1
        print(travel_day)
        # image 확장자 검사        
        print(request.FILES.get('file'))
        if request.FILES.get('file'):
            image = request.FILES.get('file')
            allowed_ext = ['jpg', 'jpeg', 'png', 'gif']

            ext = str(request.FILES.get('file')).split('.')[-1].lower()

            if not ext in allowed_ext:
                return Response({"msg":'허용된 확장자가 아닙니다.'}, staus = status.HTTP_400_BAD_REQUEST)
            
       
        letter = Letter.objects.create(
            author = author,
            from_name = data['from_name'],
            to_name = data['to_name'],
            sender=data['sender'],
            recipient = data['recipient'],
            message = data['message'],
            emotion = data['emotion'],
            openAt = data['openAt'],
            travel_day = travel_day,           
            image = image # 확장자 검사 통과한 경우에만 serializer에 추가
        )

        print(data)
        serializer = LetterSerializer(letter)
        print(serializer.data)
        # if serializer.is_valid():
            # print(serializer)
            # serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
        # return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class LetterDetail(APIView):
    permission_classes = [AllowAny]
    def get_object(self, pk):
        return get_object_or_404(Letter, pk=pk)
    def get_now(self):
        KST = timezone('Asia/Seoul')
        now = datetime.datetime.utcnow()
        localNow = utc.localize(now).astimezone(KST)
        return localNow
    def days_hours_minutes(self, td):
        return td.days, td.seconds//3600, (td.seconds//60)%60

    def get(self, request):
        pk = request.headers.get('letterid')
        letter = self.get_object(pk)
  
        #dday=letter.openAt - self.get_now()
        openDay = letter.openAt.replace(tzinfo=None)
        dday = openDay - datetime.datetime.now()
        [tday, thour, tminute] = self.days_hours_minutes(dday)

        if dday.days < 0: 
            serializer = LetterSerializer(letter)
            return Response(data=serializer.data, status = status.HTTP_200_OK)
        elif dday.days > 0:
            #날짜 남은 것
            return Response({"msg": "아직!", "dday":str(dday.days), "now" : self.get_now(), "from" : letter.from_name, "to" : letter.to_name, "openAt": letter.openAt, "sendAt": letter.sendAt, "available":False})
        elif thour > 0 or tminute > 0 or dday.seconds > 0:
            return Response({"msg": "아직!", "dday":str(dday.days), "now" : self.get_now(), "from" : letter.from_name, "to" : letter.to_name,"openAt": letter.openAt, "sendAt": letter.sendAt, "available":False})      

    def post(self, request):
        pk = request.headers.get('letterid')
        print(request.data)
        letter = self.get_object(pk) # if fail, status 404 will be returned.
        serializer=LetterSerializer(letter, data={'isOpened':True}, partial = True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)        
        return Response({"msg": "Letter read failed."}, status = status.HTTP_400_BAD_REQUEST)

    # edit, delete is not allowed
class LetterDeliever(APIView):
    permission_classes = [AllowAny,]
    def get(self, request):
        print(request.headers)
        pk = request.headers.get('Letterid')
        letter = Letter.objects.get(pk=pk)

        deliever = LetterDeliever.objects.filter(letter=letter)
        if deliever.exists():
            recipient_email = deliever[0].recipient_email
            return Response({"msg":"success", "recipient_email":recipient_email, "result":True}, status = status.HTTP_200_OK)
        return Response({"msg":"Failed to find letter deliever object."}, status = status.HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        # email = request.headers.get('email').split(' ')[-1]
        # pk = request.headers.get('letterid')

        # letter = Letter.objects.get(pk=pk)       
        # serializer = LetterDelieverySerializer(letter = letter, recipient_email = email)
        serializer = LetterDelieverySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"Letter recipient's email is saved."}, status=status.HTTP_200_OK)
        return Response({"msg":"Failed to save recipient's email"}, status=status.HTTP_400_BAD_REQUEST)