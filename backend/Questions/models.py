from django.db import models

# Create your models here.
class Questions(models.Model):
    Question =  models.CharField(max_length=255)
    Answer1 =  models.CharField(max_length=255)
    Answer2 =  models.CharField(max_length=255)
    Answer3 =  models.CharField(max_length=255)
    Answer4 =  models.CharField(max_length=255)
    Answer5 =  models.CharField(max_length=255)