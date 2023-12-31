import hashlib
import os
from django.conf import settings


def generate_random_hash():
    random_string = os.urandom(16)
    random_hash = hashlib.sha256(random_string).hexdigest()
    return random_hash


def get_random_gravatar():
    random_hash = generate_random_hash()
    gravatar_url = f'https://gravatar.com/avatar/{random_hash}?d={settings.DEFAULT_GRAVATAR_TYPE}'
    return gravatar_url
