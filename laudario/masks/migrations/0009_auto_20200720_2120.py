# Generated by Django 3.0.7 on 2020-07-20 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0008_auto_20200720_2119'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mascara',
            name='conclusao',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='topicoanormal',
            name='conclusao',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
