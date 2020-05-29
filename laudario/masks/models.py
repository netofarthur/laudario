from django.db import models



class Exam(models.Model):
    id = models.AutoField(primary_key=True) 
    description_l = models.CharField(max_length=50)
    description_s = models.CharField(max_length=25)
    initials = models.CharField(max_length=3)
    def __str__(self):
        return self.description_l
    
class Specialty(models.Model):
    id = models.AutoField(primary_key=True)
    description_l = models.CharField(max_length=50)
    description_s = models.CharField(max_length=25)
    def __str__(self):
        return self.description_l


class System(models.Model):
    id = models.AutoField(primary_key=True)
    description_l = models.CharField(max_length=50)
    description_s = models.CharField(max_length=25)
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)
    def __str__(self):
        return self.description_l



class Organ(models.Model):
    id = models.AutoField(primary_key=True)
    description_l = models.CharField(max_length=50)
    description_s = models.CharField(max_length=25)
    system = models.ForeignKey(System, on_delete=models.CASCADE)
    def __str__(self):
        return self.description_l

class Mask(models.Model):
    id = models.AutoField(primary_key=True)
    system = models.ForeignKey(System, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    contraste = False
    nome_mascara = models.CharField(max_length=50)
    titulo = models.CharField(max_length=50)
    tecnica_header = models.CharField(max_length=50)
    tecnica = models.CharField(max_length=500)
    relatorio_header = models.CharField(max_length=500)  
    def __str__(self):
        return self.nome_mascara

        
 

 









