from django.contrib import admin

# Register your models here.
from .models import Exame, TopicoNormal, Especialidade, Mascara, TopicoAnormal, TopicoAnormalBuilder, Variavel, Profile, Mensagem

admin.site.register(Exame)
admin.site.register(TopicoNormal)
admin.site.register(Especialidade)
admin.site.register(Mascara)
admin.site.register(TopicoAnormal)
admin.site.register(TopicoAnormalBuilder)
admin.site.register(Variavel)
admin.site.register(Profile)
admin.site.register(Mensagem)