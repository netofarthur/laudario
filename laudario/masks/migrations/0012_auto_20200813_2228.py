# Generated by Django 3.0.7 on 2020-08-13 22:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0011_profile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='isPremium',
            new_name='is_premium',
        ),
    ]
