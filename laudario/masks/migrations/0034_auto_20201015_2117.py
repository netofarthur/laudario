# Generated by Django 3.0.7 on 2020-10-16 00:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0033_auto_20201015_2101'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mascara',
            name='conclusao',
            field=models.CharField(max_length=2000),
        ),
        migrations.AlterField(
            model_name='topicoanormal',
            name='conclusao',
            field=models.CharField(blank=True, max_length=4000, null=True),
        ),
    ]