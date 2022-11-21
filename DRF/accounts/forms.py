from .models import User
from django import forms
from django.contrib.auth.forms import UserCreationForm

class SignupForm(UserCreationForm):

    email = forms.EmailField(label='아이디', placeholder = 'Email')
    name = forms.CharField(max_length=25, label='닉네임')
    password1 = forms.PasswordInput()
    password2 = forms.PasswordInput()


    class Meta:
        model = User
        fields = ['email', 'name', 'password1', 'password2']


    def __init__(self, *args, **kwargs):
        # SignupForm 을 재정의하여 모든 template class 속성을 'form-control' 로 지정
        super(SignupForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'