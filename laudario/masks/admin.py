from django.contrib import admin

# Register your models here.
from .models import Exam, Organ, System, Specialty

admin.site.register (Exam)
admin.site.register (Organ)
admin.site.register (System)
admin.site.register (Specialty)

