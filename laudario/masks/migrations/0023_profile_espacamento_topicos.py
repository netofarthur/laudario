# Generated by Django 3.0.7 on 2020-08-28 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0022_auto_20200828_2118'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='espacamento_topicos',
            field=models.CharField(default='0px', max_length=20),
        ),
    ]
