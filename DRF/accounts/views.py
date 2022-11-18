from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
# simplejwt
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
#from rest_framework_simplejwt.tokens import RefreshToken # to refresh token



# from django.contrib.auth.models import User
from .models import User
from .serializers import UserSerializer
# from .forms import SignupForm
import json
import datetime as dt

# KAKAO SIGN IN
from DearOneYearLetter.settings import SOCIAL_OUTH_CONFIG
from django.shortcuts import render, redirect, get_object_or_404
#from django.views import View
from django.http import JsonResponse
import requests



# Create your views here.
class KakaoSignInView(APIView):
    permission_classes = []
    def get(self, request):
        app_key = SOCIAL_OUTH_CONFIG['KAKAO_REST_API_KEY'] # 내 앱의 KAKAO_REST_API_KEY
        redirect_uri = SOCIAL_OUTH_CONFIG['KAKAO_REDIRECT_URI']
        kakao_auth_api = "https://kauth.kakao.com/oauth/authorize?response_type=code"

        return redirect(
            f'{kakao_auth_api}&client_id={app_key}&redirect_uri={redirect_uri}'
        )


class KakaoSignInCallBackView(APIView):
    permission_classes = []
    def get(self, request):
        auth_code = request.GET.get('code')
        # auth_code="BZct9Av3AXOgEASWND9qFCkduLUAI37Wg_DIOFMASPC45HuUGBgJJiC1ByKBcSzvMKIH3Ao9dRsAAAGEhX_jZQ"
        kakao_token_api = 'https://kauth.kakao.com/oauth/token'
        data = {
            'grant_type': 'authorization_code',
            'client_id': SOCIAL_OUTH_CONFIG['KAKAO_REST_API_KEY'], # 내 앱의 KAKAO_REST_API_KEY
            'redirection_uri': SOCIAL_OUTH_CONFIG['KAKAO_REDIRECT_URI'],
            'code': auth_code
        }

        token_response = requests.post(kakao_token_api, data=data)

        access_token = token_response.json().get('access_token') # kakao 계정의 access_token
        # 카카오의 refresh_token은 언제 쓰나요???
        kakao_user_api = "https://kapi.kakao.com/v2/user/me"
        header = {"Authorization": f"Bearer ${access_token}"}
        user_info_response = requests.get(kakao_user_api, headers=header) # request 카카오 사용자 정보

        if not user_info_response:
            return Response(status = status.HTTP_400_BAD_REQUEST)

        kakaoAccount = user_info_response.json().get('kakao_account')
        # Email validity check 
        if not kakaoAccount.get('is_email_valid') or not kakaoAccount.get('is_email_verified'):
            context = {"msg":"Your email is not valid or verified."}
            return Response(context, status = status.HTTP_401_UNAUTHORIZED)
        
        kakaoEmail = kakaoAccount.get('email') # valid email
        
        if not User.objects.filter(email = kakaoEmail).exists():
            # create user
            if kakaoAccount['has_birthday']:
                birth_str = "2023"+kakaoAccount['birthday']
            else:
                birth_str = '20230101'
            user = User.objects.create(
                email = kakaoEmail,
                name = kakaoAccount['profile']['nickname'],
                kakao_id = user_info_response.json().get('id'),
                birthday = dt.datetime.strptime(birth_str, '%Y%m%d')
            )
        else:
            user = User.objects.get(email = kakaoEmail)
        
        # user 모델을 가지고 이 서비스의 토큰을 만듦
        if user is not None:
            token = TokenObtainPairSerializer.get_token(user)
            my_access_token = str(token.access_token)
            my_refresh_token = str(token)

            data = {
                "user" : UserSerializer(user).data,
                "msg": "Logged in!", 
                "my_access_token": my_access_token,
                "my_refresh_token": my_refresh_token    
            }
            res = Response(data = data, status=status.HTTP_200_OK)
            res.set_cookie('my_access_token', my_access_token)
            return res
        else:
            context = {"msg":"Log in failed...", "name": kakaoAccount['profile']['nickname'], "birthday": birth_str}
            return Response(context, status = status.HTTP_400_BAD_REQUEST)

        # 예제에 있던 JsonResponse 이건 front로 보내려고 json resonse 한 건가????
        #return JsonResponse({"user_info": user_info_response.json()}) 


# kakao 연동 해제 -> 나중에 생각하자
class KakaoSignOutView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):        
        auth_code = request.GET.get('code')
        kakao_token_api = 'https://kauth.kakao.com/oauth/token'
        data = {
            'grant_type': 'authorization_code',
            'client_id': SOCIAL_OUTH_CONFIG['KAKAO_REST_API_KEY'], # 내 앱의 KAKAO_REST_API_KEY
            'redirection_uri': SOCIAL_OUTH_CONFIG['KAKAO_REDIRECT_URI'],
            'code': auth_code
        }

        token_response = requests.post(kakao_token_api, data=data)
        access_token = token_response.json().get('access_token') # kakao 계정의 access_token
       

        kakao_signout_api = 'https://kapi.kakao.com/v1/user/unlink'
        header = {"Authorization": f"Bearer ${access_token}"}
        signout_response = requests.post(kakao_signout_api, headers=header) # id 리턴함
        kakao_id = signout_response.json().get('id')

        user = User.objects.get(kakao_id = kakao_id)
        user.delete()
        return Response(context = {"msg": "탈퇴 완료."}, status = status.HTTP_204_NO_CONTENT)


class CreateUserView(APIView):

    def post(self, request):
        
        # data = json.loads(request.body)
        data = request.body
        email = data['email']
        # password = data['password']
        name = data['name']
        created_user = User.objects.create_user(
            email=email,
            name = name,
            birthday = data['birthday']
        )

        # profile = Profile.objects.create(
        #     user = created_user,
        #     email = email,
        #     name = name,
        #     birth = data['birth']
        # )

        context = {
            'msg':"User is created.",
            "email": created_user.email
        }
        return Response(context, status = status.HTTP_201_CREATED)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, user_pk):
        user = get_object_or_404(User, pk=user_pk)
        serializer=UserSerializer(user)
        return Response(serializer.data)
    

