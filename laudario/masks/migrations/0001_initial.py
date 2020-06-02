# Generated by Django 3.0.6 on 2020-06-02 02:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Especialidade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descricao', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Exame',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descricao', models.CharField(max_length=50)),
                ('initials', models.CharField(max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Mascara',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('titulo', models.CharField(max_length=50)),
                ('tecnica_header', models.CharField(max_length=50)),
                ('tecnica', models.CharField(max_length=500)),
                ('relatorio_header', models.CharField(max_length=500)),
                ('exame', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='masks.Exame')),
            ],
        ),
        migrations.CreateModel(
            name='TopicoLaudo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('orgao', models.CharField(max_length=50)),
                ('relatorio', models.CharField(max_length=500)),
                ('mascara', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='masks.Mascara')),
            ],
        ),
        migrations.CreateModel(
            name='Sistema',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descricao', models.CharField(max_length=50)),
                ('especialidade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='masks.Especialidade')),
            ],
        ),
        migrations.AddField(
            model_name='mascara',
            name='sistema',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='masks.Sistema'),
        ),
    ]
