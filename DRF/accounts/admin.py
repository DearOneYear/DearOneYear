from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# class AccountAdmin(UserAdmin):
#     # 관리자 화면에 보이는 Column 지정
#     list_display = ('email','name','is_staff')
#     search_fields = ('email', 'name')
#     # readonly_fields = ('id')
 
#     filter_horizontal = ()
#     list_filter = ()
#     fieldsets = ()
 
 
# admin.site.register(User, AccountAdmin)
admin.site.register(User)




