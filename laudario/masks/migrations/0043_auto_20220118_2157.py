# Generated by Django 3.1.14 on 2022-01-19 00:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0042_auto_20220118_2143'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mensagem',
            name='mensagem',
            field=models.TextField(max_length=4000),
        ),
    ]
