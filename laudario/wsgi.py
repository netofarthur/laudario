"""
WSGI config for laudario project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
from pathlib import Path

#TESTE
senha = Path('/Users/arthur/vars/senha').read_text()

#PRODUÇÃO
#senha = Path('/home/arthur/vars/senha').read_text()

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'laudario.settings')
os.environ.setdefault('SENHA', senha)

application = get_wsgi_application()
