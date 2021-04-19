from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    uses = models.CharField(max_length=1000)

    def __str__(self):
        return f"{self.name} - {self.uses}"