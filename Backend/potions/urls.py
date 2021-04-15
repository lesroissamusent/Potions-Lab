from django.urls import path
from .views import PotionListView
from .views import PotionDetailView

urlpatterns = [
	path('', PotionListView.as_view()),
    path('<int:pk/', PotionDetailView.as_view())
]
