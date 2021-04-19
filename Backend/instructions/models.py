from django.db import models

class Instruction(models.Model):
    description = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.description}"