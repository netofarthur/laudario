# Generated by Django 3.0.6 on 2020-06-09 00:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0005_remove_mascara_template_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='topicoanormal',
            name='template_name',
        ),
    ]