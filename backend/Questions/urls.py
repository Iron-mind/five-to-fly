from django.urls import path
from .views import QuestionsListCreateView

urlpatterns = [
    path('show/', QuestionsListCreateView.as_view(), name='questions-list-create'),
    # Agrega más rutas según sea necesario
]
