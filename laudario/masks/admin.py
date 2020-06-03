from django.contrib import admin

# Register your models here.
from .models import Exame, TopicoNormal, Especialidade, Mascara, TopicoAnormal

admin.site.register(Exame)
admin.site.register(TopicoNormal)
admin.site.register(Especialidade)
admin.site.register(Mascara)
admin.site.register(TopicoAnormal)
