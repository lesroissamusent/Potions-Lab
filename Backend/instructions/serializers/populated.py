from .common import InstructionSerializer
from potions.serializers.common import PotionSerializer

class PopulatedInstructionSerializer(InstructionSerializer):

    potions = PotionSerializer(many=True)
