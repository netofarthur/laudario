# Generated by Django 3.0.7 on 2020-10-01 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0030_topiconormal_ordem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mascara',
            name='indicacoes_header',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='mascara',
            name='nome',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='mascara',
            name='tecnica',
            field=models.CharField(max_length=1000),
        ),
        migrations.AlterField(
            model_name='mascara',
            name='titulo',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='topicoanormal',
            name='nome',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='topiconormal',
            name='relatorio',
            field=models.TextField(max_length=3000),
        ),
    ]