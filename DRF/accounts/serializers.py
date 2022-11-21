from dataclasses import field
from rest_framework import serializers as sz
from .models import User

class UserSerializer(sz.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
        #read_only_fields = ()
        #write_only_fields = ('password',)

        # extra_kwargs = {
        #     'kakao_id' : {'write_only' : True}
        # }