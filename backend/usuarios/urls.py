from django.urls import path, include
from rest_framework import routers
from usuarios import views

router = routers.DefaultRouter()
#router.register(r'register',views.RegisterView,'register')
#router.register(r'logout',views.LogoutView,'logout')
router.register(r'userProfile',views.UserProfileViewSet,'userProfile')
router.register(r'register',views.RegisterViewSet,'register')

router.register(r'questions',views.QuestionViewSet,'questions')
router.register(r'places',views.PlacesViewSet,'places')

urlpatterns = [
   path('api/', include(router.urls)),
   #path('register/', views.RegisterView.as_view(), name='register'),
   #path('login/', views.LoginView.as_view(), name='login'),
   path('logout/', views.LogoutView.as_view(), name='logout'),
]
