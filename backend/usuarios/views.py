from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserProfileSerializer, UserRegistrationSerializer
from .models import UserProfile
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


class LoginView(APIView):
  permission_classes = [permissions.AllowAny]

  def post(self, request, format=None):
      data = request.data
      correo = data.get('correo')
      password = data.get('password')

      try:
          user = UserProfile.objects.get(correo=correo)
      except UserProfile.DoesNotExist:
          return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

      if not user.check_password(password):
          return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_404_NOT_FOUND)
      
      return Response(UserProfileSerializer(user).data, status=status.HTTP_200_OK)
  
class RegisterView(APIView):
   permission_classes = [permissions.AllowAny]

   def post(self, request, format=None):
       serializer = UserRegistrationSerializer(data=request.data)
       if serializer.is_valid():
           user = serializer.save()
           user.set_password(serializer.validated_data['password']) 
           user.save()
           token, created = Token.objects.get_or_create(user=user)
           return Response({'token': token.key}, status=status.HTTP_201_CREATED)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
   permission_classes = [permissions.IsAuthenticated]

   def post(self, request, format=None):
       request.user.auth_token.delete()
       return Response(status=status.HTTP_200_OK)