from django.contrib.auth.models import AbstractUser, Group
from django.db import models

# Create your models here.
class UserProfile(AbstractUser):
   USERNAME_FIELD = 'correo'
   correo = models.EmailField(unique=True)
   celular = models.CharField(max_length=15, null=True, blank=True)
   direccion = models.CharField(max_length=255, null=True, blank=True)
   ciudad = models.CharField(max_length=100, null=True, blank=True)
   


class Role(Group):
   description = models.CharField(max_length=180, null=True, blank=True)
