from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Potion 
from .serializers.common import PotionSerializer
from .serializers.populated import PopulatedPotionSerializer


class PotionListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        potions = Potion.objects.all()
        serialized_potions = PopulatedPotionSerializer(potions, many=True) 
        return Response(serialized_potions.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        potion_to_add = PotionSerializer(data=request.data) # convert back from JSON
        if potion_to_add.is_valid():
            potion_to_add.save()
            return Response(potion_to_add.data, status=status.HTTP_201_CREATED)
        return Response(potion_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class PotionDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_potion(self, pk):
        try:
            return Potion.objects.get(pk=pk)
        except Potion.DoesNotExist:
            raise NotFound(detail="😭 Cannot find that potion")

    def get(self, _request, pk):
        potion = self.get_potion(pk=pk)
        serialized_potion = PopulatedPotionSerializer(potion)
        return Response(serialized_potion.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        potion_to_delete = self.get_potion(pk=pk)
        potion_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        potion_to_edit = self.get_potion(pk=pk)
        updated_potion = PotionSerializer(potion_to_edit, data=request.data)
        if updated_potion.is_valid():
            updated_potion.save()
            return Response(updated_potion.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_potion.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
