"""DearOneYearLetter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import KakaoSignInView, KakaoSignInCallBackView, KakaoSignOutView, VerifyUser, UserDetailView

urlpatterns = [
    path('signin/kakao/', KakaoSignInView.as_view()),
    path('signin/kakao/callback/', KakaoSignInCallBackView.as_view()), # kakao 앱에서 설정한 redirect_uri와 일치하게
    path('signout/kakao/', KakaoSignOutView.as_view()),
    path('verify/', VerifyUser.as_view() ),
    path('mypage/', UserDetailView.as_view()), # front에서 query string을 받으면 뒤에 int 어쩌구는 지울 수 있을지도?
]
