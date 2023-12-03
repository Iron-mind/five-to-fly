from django.urls import path
#from .views import QuestionsListCreateView
from .views import question_id, show_question

urlpatterns = [
    path('show/id/<int:id>/', question_id, name='show_question_by_id'),
    path('show/', show_question, name='show_question')
]

