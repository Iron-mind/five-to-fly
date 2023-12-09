from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class UserProfile(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=128)  # Para almacenar contraseñas seguras, considera usar un campo especializado como 'PasswordField'.
    celular = models.CharField(max_length=15)
    direccion = models.CharField(max_length=255, null=True, blank=True)  # El uso de 'null=True' y 'blank=True' permite que el campo sea opcional.
    ciudad = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.nombre
    

class Questions(models.Model):
    texto = models.CharField(max_length=200)
    # Agrega más campos según sea necesario

class Places(models.Model):
    name = models.CharField(max_length=100)
    img = models.URLField(max_length=500)
    description = description = models.CharField(max_length=1000)
    weights = ArrayField(models.IntegerField())
    # Agrega más campos según sea necesario
