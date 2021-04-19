from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Instruction 
from .serializers.common import InstructionSerializer

class InstructionListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        instructions = Instruction.objects.all()
        serialized_instructions = InstructionSerializer(instructions, many=True) 
        return Response(serialized_instructions.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        instruction_to_add = InstructionSerializer(data=request.data) # convert back from JSON
        if instruction_to_add.is_valid():
            instruction_to_add.save()
            return Response(instruction_to_add.data, status=status.HTTP_201_CREATED)
        return Response(instruction_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class InstructionDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_instruction(self, pk):
        try:
            return Instruction.objects.get(pk=pk)
        except Instruction.DoesNotExist:
            raise NotFound(detail="😭 Cannot find that instruction")

    def get(self, _request, pk):
        instruction = self.get_instruction(pk=pk)
        serialized_instruction = InstructionSerializer(instruction)
        return Response(serialized_instruction.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        instruction_to_delete = self.get_instruction(pk=pk)
        instruction_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        instruction_to_edit = self.get_instruction(pk=pk)
        updated_instruction = InstructionSerializer(instruction_to_edit, data=request.data)
        if updated_instruction.is_valid():
            updated_instruction.save()
            return Response(updated_instruction.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_instruction.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
