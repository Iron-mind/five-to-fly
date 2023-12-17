from django.contrib.auth.models import AbstractUser, Group
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

# Create your models here.
class UserProfile(AbstractUser):
    USERNAME_FIELD = 'correo'
    correo = models.EmailField(unique=True)
    celular = models.CharField(max_length=15, null=True, blank=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)
    ciudad = models.CharField(max_length=100, null=True, blank=True)
    updateAt = models.DateTimeField(auto_now=True)
    lastForm = ArrayField(models.CharField(max_length=100), null=True, blank=True)
    img = models.URLField(max_length=500, null=True, blank=True)
    rate = models.IntegerField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        # Actualiza manualmente el campo 'updateAt' antes de guardar
        self.updateAt = timezone.now()
        super().save(*args, **kwargs)
   

class Questions(models.Model):
    texto = models.CharField(max_length=200)
    # Agrega más campos según sea necesario

class Places(models.Model):
    name = models.CharField(max_length=100)
    img = models.URLField(max_length=500)
    description = models.CharField(max_length=1000)
    weights = ArrayField(models.IntegerField())
    # Agrega más campos según sea necesario

class Role(Group):
   description = models.CharField(max_length=180, null=True, blank=True)
