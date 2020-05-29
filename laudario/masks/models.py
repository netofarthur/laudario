from django.db import models



class Exam(models.Model):
    id = models.AutoField(primary_key=True) 
    long_description = models.CharField(max_length=50)
    short_description = models.CharField(max_length=25)
    initials = models.CharField(max_length=3)
    def __str__(self):
        return self.long_description
    
class Specialty(models.Model):
    id = models.AutoField(primary_key=True)
    long_description = models.CharField(max_length=50)
    short_description = models.CharField(max_length=25)
    def __str__(self):
        return self.long_description

class System(models.Model):
    id = models.AutoField(primary_key=True)
    long_description = models.CharField(max_length=50)
    short_description = models.CharField(max_length=25)
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE)
    def __str__(self):
        return self.long_description




class Organ(models.Model):
    id = models.AutoField(primary_key=True)
    long_description = models.CharField(max_length=50)
    short_description = models.CharField(max_length=25)
    system = models.ForeignKey(System, on_delete=models.CASCADE)
    def __str__(self):
        return self.long_description


class Mask(models.Model):
    id = models.AutoField(primary_key=True)
    system = models.ForeignKey(System, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    contrast = False
    mask_name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    technique_header = models.CharField(max_length=50)
    technique = models.CharField(max_length=500)
    report_header = models.CharField(max_length=500)  
    def __str__(self):
        return self.mask_name

        
 

 









