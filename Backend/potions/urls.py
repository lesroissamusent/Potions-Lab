from django.urls import path 
from .views import PotionListView, PotionDetailView

urlpatterns = [
    path('', PotionListView.as_view()),
    path('<int:pk>/', PotionDetailView.as_view())
]