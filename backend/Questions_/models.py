from django.db import models

# Create your models here.
class Questions(models.Model):
    Question =  models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)