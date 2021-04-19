from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Ingredient 
from .serializers.common import IngredientSerializer

class IngredientListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        ingredients = Ingredient.objects.all()
        serialized_ingredients = IngredientSerializer(ingredients, many=True) 
        return Response(serialized_ingredients.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        ingredient_to_add = IngredientSerializer(data=request.data) # convert back from JSON
        if ingredient_to_add.is_valid():
            ingredient_to_add.save()
            return Response(ingredient_to_add.data, status=status.HTTP_201_CREATED)
        return Response(ingredient_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class IngredientDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_ingredient(self, pk):
        try:
            return Ingredient.objects.get(pk=pk)
        except Ingredient.DoesNotExist:
            raise NotFound(detail="😭 Cannot find that ingredient")

    def get(self, _request, pk):
        ingredient = self.get_ingredient(pk=pk)
        serialized_ingredient = IngredientSerializer(ingredient)
        return Response(serialized_ingredient.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        ingredient_to_delete = self.get_ingredient(pk=pk)
        ingredient_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        ingredient_to_edit = self.get_ingredient(pk=pk)
        updated_ingredient = IngredientSerializer(ingredient_to_edit, data=request.data)
        if updated_ingredient.is_valid():
            updated_ingredient.save()
            return Response(updated_ingredient.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_ingredient.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
