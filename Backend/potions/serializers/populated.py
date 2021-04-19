from ingredients.serializers.common import IngredientSerializer
from ..serializers.common import PotionSerializer 

class PopulatedPotionSerializer(PotionSerializer):

    ingredients = IngredientSerializer(many=True)
    print(PopulatedPotionSerializer)