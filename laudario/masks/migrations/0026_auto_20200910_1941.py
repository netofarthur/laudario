# Generated by Django 3.0.7 on 2020-09-10 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masks', '0025_profile_margem_cabecalho'),
    ]

    operations = [
        migrations.AlterField(
            model_name='especialidade',
            name='descricao',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='exame',
            name='descricao',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='exame',
            name='initials',
            field=models.CharField(max_length=5),
        ),
        migrations.AlterField(
            model_name='mascara',
            name='conclusao',
            field=models.CharField(max_length=2000),
        ),
        migrations.AlterField(
            model_name='mascara',
            name='info_adicional',
            field=models.TextField(max_length=2000),
        ),
        migrations.AlterField(
            model_name='mascara',
            name='relatorio_header',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='topicoanormal',
            name='conclusao',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
        migrations.AlterField(
            model_name='topicoanormal',
            name='relatorio',
            field=models.CharField(max_length=2000),
        ),
        migrations.AlterField(
            model_name='topiconormal',
            name='relatorio',
            field=models.TextField(max_length=2000),
        ),
        migrations.AlterField(
            model_name='variavel',
            name='nome_amigavel',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='variavel',
            name='unidade_medida',
            field=models.CharField(max_length=50),
        ),
    ]