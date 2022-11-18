from django.db import models

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models


# Create your models here.
# Reference : https://dev-mht.tistory.com/114
class UserManager(BaseUserManager):
    """User 에서 사용하기 위한 UserManager 생성"""
    def create_user(self, email, password=None, **extra_fields):
        """일반 유저로 생성할 경우"""
        if not email:
            raise ValueError('이메일을 입력해주세요.')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """superuser 로 user 를 생성할 경우 필드값을 True 로 변경"""
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """UserManager 를 objects 필드에 사용"""

    email = models.EmailField(verbose_name='email', max_length=100, unique=True)
    name = models.CharField(max_length=50, null = True) # nickname
    kakao_id = models.CharField(max_length=50, default='')
    birthday = models.DateTimeField(null=True)
    create_at = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login  = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)    
    # profile_img = models.ImageField(upload_to='profile', null=True)
    # cover_img = models.ImageField(upload_to='cover', null=True)
    # introduce = models.TextField(max_length=255)

    # UserManager 을 재정의하여 사용
    objects = UserManager()
    # USERNAME 를 email 로 사용
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    def has_perm(self, perm, obj=None):
        """사용자에게 특정 권한이 있는지 확인"""
        return True

    def has_module_perms(self, app_label):
        """사용자가 app_label 앱을 볼 수 있는 권한이 있는지 확인"""
        return True

    # @property
    def is_staff(self):
        """User가 관리자인지 확인"""
        return self.is_superuser



# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete = models.CASCADE)
#     email = models.EmailField(max_length=255, unique=True)
#     name = models.CharField(max_length=50) # nickname
#     birth = models.DateField(null=True)
#     # password
#     def __str__(self):
#         return self.name
