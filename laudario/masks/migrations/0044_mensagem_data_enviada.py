# Generated by Django 3.1.14 on 2022-01-19 01:12

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0043_auto_20220118_2157'),
    ]

    operations = [
        migrations.AddField(
            model_name='mensagem',
            name='data_enviada',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
