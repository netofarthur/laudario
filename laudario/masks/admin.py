from django.contrib import admin

# Register your models here.
from .models import Exame, TopicoLaudo, Sistema, Especialidade, Mascara

admin.site.register(Exame)
admin.site.register(TopicoLaudo)
admin.site.register(Sistema)
admin.site.register(Especialidade)
admin.site.register(Mascara)
