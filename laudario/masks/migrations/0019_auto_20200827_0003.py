# Generated by Django 3.0.7 on 2020-08-27 00:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0018_profile_tamanho_fonte'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='alinhamento_titulo',
            field=models.CharField(default='center', max_length=20),
        ),
        migrations.AddField(
            model_name='profile',
            name='cor_mascara',
            field=models.CharField(default='#000000', max_length=20),
        ),
        migrations.AddField(
            model_name='profile',
            name='cor_titulo',
            field=models.CharField(default='#000000', max_length=20),
        ),
    ]
