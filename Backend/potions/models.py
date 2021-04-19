from django.db import models

class Potion(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="potions",
        on_delete= models.CASCADE
    )
    image = models.CharField(max_length=300)
    ingredients = models.ManyToManyField('ingredients.Ingredient', related_name="potions")
    instructions = models.ManyToManyField('instructions.Instruction', related_name="potions")

    def __str__(self):
        return f"{self.name} - {self.owner}"