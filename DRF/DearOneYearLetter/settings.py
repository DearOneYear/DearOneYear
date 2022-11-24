"""
Django settings for DearOneYearLetter project.

Generated by 'django-admin startproject' using Django 4.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

from pathlib import Path
import os, json, datetime
from django.core.exceptions import ImproperlyConfigured
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# secret.json
secret_file = os.path.join(BASE_DIR, 'secrets.json')  # secrets.json 파일 위치를 명시

with open(secret_file) as f:
    secrets = json.loads(f.read())

def get_secret(setting):
    """비밀 변수를 가져오거나 명시적 예외를 반환한다."""
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)

SECRET_KEY = get_secret("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    ### KAKAO LOGIN
    'django.contrib.sites',
    'accounts.apps.AccountsConfig',
    'rest_framework', # drf
    ### Token
    'corsheaders',# corsheaders
    'rest_framework_simplejwt', # jwt
    'rest_framework_simplejwt.token_blacklist', # jwt for logout

    ### my apps
    'main',
    'letter',
    # 'accounts', 
]

SOCIAL_OUTH_CONFIG = {
    'KAKAO_REST_API_KEY' : get_secret("KAKAO_REST_API_KEY"),
    'KAKAO_REDIRECT_URI' : get_secret("KAKAO_REDIRECT_URI"),
    # 'KAKAO_SECRET_KEY' : get_secret("KAKAO_SECRET_KEY")
}

SITE_ID = 1


# Emain login
# Use email, password, username
# https://programmers-sosin.tistory.com/entry/Django-%EC%9E%A5%EA%B3%A0-%EC%9C%A0%EC%A0%80-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-5-%EC%9D%B4%EB%A9%94%EC%9D%BC%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%95%98%EA%B8%B0-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
# ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
# ACCOUNT_CONFRIM_EMAIL_ON_GET = True # 카카오 인증하면서 이메일 인증 필요없어짐
ACCOUNT_LOGIN_ATTEMPTS_LIMIT = 5
ACCOUNT_LOGIN_ATTEMPTS_TIMEOUT = 365

AUTH_USER_MODEL = 'accounts.User' 

# AUTHENTICATION_BACKENDS = (
#     'django.contrib.auth.backends.ModelBackend',
#     'allauth.account.auth_backends.AuthenticationBackend',
# )

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'DearOneYearLetter.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'DearOneYearLetter.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'
# Media files - 업로드를 하는 URL과 디렉토리 설정
MEDIA_URL = '/files/' # 업로드 할 경로
MEDIA_ROOT = os.path.join(BASE_DIR, 'uploads') #로컬 디렉토리 어디에 저장할 것인지


# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# cors 설정(다른 포트 간의 소통을 위해)
# React 포트 번호 물어보자...
CORS_ORIGIN_WHITELIST = ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:8000', 'http://localhost:3000']
CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {

    'DEFAULT_PERMISSION_CLASSES': (
        # authentication is needed
        # 회원가입 여부 체크
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES':(
        # authorization
        # jwt를 이용하여 인증함
        'rest_framework_simplejwt.authentication.JWTAuthentication', # token을 이용한 인증
        # 'rest_framework.authentication.SessionAuthentication', # session을 통한 인증
        # 'rest_framework.authentication.BasicAuthentication',
    )
    
}


# document
# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html
# https://medium.com/grad4-engineering/how-to-blacklist-json-web-tokens-in-django-43fb88ae3d17
SIMPLE_JWT = {
    # access token 기한
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(days=7), # minutes=5
    # refresh token 기한
    'REFRESH_TOKEN_LIFETIME': datetime.timedelta(days=28),

    # True일 경우 refresh token 보내면 새로운 access token, refresh token 반환함
    # False일 경우 refresh token은 유지하고 access token만 새로 반환함
    'ROTATE_REFRESH_TOKENS': False, 
    # True일 경우 기존 refresh token이 블랙리스트가 됨 (사용 불가하다는 뜻인 듯)
    'BLACKLIST_AFTER_ROTATION': True, 
    'UPDATE_LAST_LOGIN': False,

    # 암호화 알고리즘
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,

    'AUTH_HEADER_TYPES': ('Bearer',), # defulat value

    # 'TOKEN_USER_CLASS': 'accounts.User',

}