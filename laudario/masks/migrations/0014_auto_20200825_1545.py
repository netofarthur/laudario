# Generated by Django 3.0.7 on 2020-08-25 15:45

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0013_mascara_ultima_vez_usado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mascara',
            name='ultima_vez_usado',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
