# Generated by Django 3.0.7 on 2020-08-25 15:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0012_auto_20200813_2228'),
    ]

    operations = [
        migrations.AddField(
            model_name='mascara',
            name='ultima_vez_usado',
            field=models.DateField(default=datetime.date(2020, 8, 25)),
        ),
    ]