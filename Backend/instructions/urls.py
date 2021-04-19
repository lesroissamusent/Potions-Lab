from django.urls import path 
from .views import InstructionListView, InstructionDetailView

urlpatterns = [
    path('', InstructionListView.as_view()),
    path('<int:pk>/', InstructionDetailView.as_view())
]