from django.db import models

class Exame(models.Model):
	description_l = models.CharField(max_length=50)
	description_s = models.CharField(max_length=25)
	sigla = models.CharField(max_length=3)
