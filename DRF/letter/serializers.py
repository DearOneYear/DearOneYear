from dataclasses import field
from rest_framework import serializers as sz
from .models import Letter, LetterDelievery
from accounts.models import User

class LetterSerializer(sz.ModelSerializer):
    class Meta:
        model = Letter
        fields = '__all__'
        read_only_fields = ['author']

class LetterDelieverySerializer(sz.ModelSerializer):
    class Meta:
        model = LetterDelievery
        fields = '__all__'
        read_only_fields = ['letter']