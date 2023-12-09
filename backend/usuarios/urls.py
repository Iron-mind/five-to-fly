from django.urls import path, include
from rest_framework import routers
from usuarios import views



router = routers.DefaultRouter()
router.register(r'questions', views.QuestionViewSet,'questions')
router.register(r'places', views.PlacesViewSet,'places')


urlpatterns = [
    path('api/', include(router.urls))
]