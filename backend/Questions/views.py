from rest_framework import generics
from .models import Questions
from .serializers import QuestionsSerializer

class QuestionsListCreateView(generics.ListCreateAPIView):
    queryset = Questions.objects.all()
    serializer_class = QuestionsSerializer
