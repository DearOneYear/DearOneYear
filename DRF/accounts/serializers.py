from dataclasses import field
from rest_framework import serializers as sz
from .models import User

class UserSerializer(sz.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'