from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 
from rest_framework.exceptions import NotFound

from .models import Potion 
from .serializers.common import PotionSerializer

class PotionListView(APIView):

    def get(self, _request):
        potions = Potion.objects.all()
        serialized_potions = PotionSerializer(potions, many=True) 
        return Response(serialized_potions.data, status=status.HTTP_200_OK)

class PotionDetailView(APIView):

    def get_potion(self, pk):
        try:
            return Potion.objects.get(pk=pk)
        except Potion.DoesNotExist:
            raise NotFound(detail="🤪 Cannot find that potion")

    def get(self, _request, pk): # pk stands for primary key (similar to :id)
        potion = Potion.Objects.get(pk=pk) #REMOVE THIS LINE
        self.get_potion(pk=pk) #ADD THIS LINE
        serialized_potion = PotionSerializer(potion)
        return Response(serialized_potion.data, status=status.HTTP_200_OK)

    def post(self, request):
        potion_to_add = PotionSerializer(data=request.data) # convert back from JSON
        if potion_to_add.is_valid():
            potion_to_add.save()
            return Response(potion_to_add.data, status=status.HTTP_201_CREATED)
        return Response(potion_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)