from django.contrib import admin

# Register your models here.
from .models import Exame, TopicoNormal, Especialidade, Mascara

admin.site.register(Exame)
admin.site.register(TopicoNormal)
admin.site.register(Especialidade)
admin.site.register(Mascara)
