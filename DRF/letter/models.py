from django.db import models
from accounts.models import User
from datetime import datetime
from datetime import timedelta
# from django.utils import timezone

import datetime
from pytz import timezone, utc

# Create your models here.


class Letter(models.Model):    
    # letter id 없어도 letter 모델의 id로 충분히 커버 가능한 듯?
    # letterId = models.CharField(max_length=50) # identifier of each letter
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    from_name = models.CharField(max_length=10)
    to_name = models.CharField(max_length=10)
    sender = models.CharField(max_length=50)
    recipient = models.CharField(max_length=50)    
    message = models.CharField(max_length=1000)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    emotion = models.CharField(max_length=100, default = '')

    KST = timezone('Asia/Seoul')
    now = datetime.datetime.utcnow()
    localNow = utc.localize(now).astimezone(KST)
    sendAt = models.DateTimeField(default = localNow)
    openAt = models.DateTimeField(default = localNow + timedelta(days=365)-timedelta(hours=localNow.hour, minutes=localNow.minute, seconds=localNow.second))
    isOpened = models.BooleanField(default=False)
    travel_day = models.PositiveSmallIntegerField(default=365)
    def __str__(self):
        return "편지 " + self.from_name + "->" + self.to_name

class LetterDelievery(models.Model):
    letter = models.OneToOneField(Letter, on_delete=models.CASCADE)
    recipient_email = models.EmailField()