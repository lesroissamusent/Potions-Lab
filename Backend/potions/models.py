from django.db import models

class Potion(models.Model):
    name = models.CharField(max_length=50)
    owner = models.CharField(max_length=50, default='admin')
    image = models.CharField(max_length=300)

    def __str__(self):
        return f"{self.name} - {self.owner}"