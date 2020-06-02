from django.contrib import admin

# Register your models here.
from .models import Exame, TopicoLaudo, Especialidade, Mascara

admin.site.register(Exame)
admin.site.register(TopicoLaudo)
admin.site.register(Especialidade)
admin.site.register(Mascara)
