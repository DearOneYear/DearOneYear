# Generated by Django 4.1.3 on 2022-11-30 16:52

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('letter', '0003_letter_image_alter_letter_openat_alter_letter_sendat'),
    ]

    operations = [
        migrations.AddField(
            model_name='letter',
            name='emotion',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='letter',
            name='travel_day',
            field=models.PositiveSmallIntegerField(default=365),
        ),
        migrations.AlterField(
            model_name='letter',
            name='message',
            field=models.CharField(max_length=1000),
        ),
        migrations.AlterField(
            model_name='letter',
            name='openAt',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 30, 15, 0, 0, 356078, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='letter',
            name='sendAt',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 30, 16, 52, 38, 356078, tzinfo=datetime.timezone.utc)),
        ),
    ]