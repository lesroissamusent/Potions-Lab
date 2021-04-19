from ingredients.serializers.common import IngredientSerializer
from instructions.serializers.common import InstructionSerializer
from ..serializers.common import PotionSerializer 

class PopulatedPotionSerializer(PotionSerializer):

    ingredients = IngredientSerializer(many=True)
    instructions = InstructionSerializer(many=True)

