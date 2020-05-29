from django.contrib import admin

# Register your models here.
from .models import Exam, Organ, System, Specialty, Mask

admin.site.register (Exam)
admin.site.register (Organ)
admin.site.register (System)
admin.site.register (Specialty)
admin.site.register (Mask)
