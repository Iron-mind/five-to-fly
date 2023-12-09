from .models import *
from .serializer import *
from rest_framework import viewsets


# Create your views here.
class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionsSerializer
    queryset =  Questions.objects.all()

class PlacesViewSet(viewsets.ModelViewSet):
    serializer_class = PlacesSerializer
    queryset =  Places.objects.all()




