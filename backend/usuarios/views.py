from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import *
from .serializer import *
import logging
from django.views.decorators.csrf import csrf_exempt

logger = logging.getLogger(__name__)

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset =  UserProfile.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        # Método para el inicio de sesión
        data = request.data
        correo = data.get('correo')
        password = data.get('password')

        try:
            user = UserProfile.objects.get(correo=correo)
        except ObjectDoesNotExist:
            logger.warning(f'Intento de inicio de sesión fallido para el usuario con correo: {correo}')
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f'Error al buscar usuario: {str(e)}')
            return Response({'error': 'Error interno del servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if not user.check_password(password):
            logger.warning(f'Intento de inicio de sesión fallido para el usuario con correo: {correo} (Contraseña incorrecta)')
            return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)

        logger.info(f'Inicio de sesión exitoso para el usuario con correo: {correo}')
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        # Método para la actualización de la información del usuario
        data = request.data
        correo = data.get('correo')

        try:
            user = UserProfile.objects.get(correo=correo)
        except ObjectDoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f'Error al buscar usuario: {str(e)}')
            return Response({'error': 'Error interno del servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        for key, value in data.items():
            setattr(user, key, value)

        try:
            user.save()
            logger.info(f'Información actualizada para el usuario con correo: {correo}')
            
            serializer = UserProfileSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f'Error al guardar la información actualizada: {str(e)}')
            return Response({'error': 'Error al guardar la información actualizada'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class LoginView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request, format=None):
#         data = request.data
#         correo = data.get('correo')
#         password = data.get('password')

#         try:
#             user = UserProfile.objects.get(correo=correo)
        
#         except ObjectDoesNotExist: #caso en que no exista
#             logger.warning(f'Intento de inicio de sesión fallido para el usuario con correo: {correo}')
#             return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e: #caso en que el servidor falle
#             logger.error(f'Error al buscar usuario: {str(e)}')
#             return Response({'error': 'Error interno del servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         if not user.check_password(password): #caso en que no sea el usuario
#             logger.warning(f'Intento de inicio de sesión fallido para el usuario con correo: {correo} (Contraseña incorrecta)')
#             return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)

#         #mensaje de confirmación
#         logger.info(f'Inicio de sesión exitoso para el usuario con correo: {correo}')
#         serializer = UserProfileSerializer(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     def put(self, request, format=None):
#         data = request.data
#         correo = data.get('correo')

#         try:
#             user = UserProfile.objects.get(correo=correo)
#         except ObjectDoesNotExist:
#             return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             logger.error(f'Error al buscar usuario: {str(e)}')
#             return Response({'error': 'Error interno del servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         # Actualiza los campos según la información proporcionada en la solicitud PUT
#         # Puedes ajustar esto según cómo quieras manejar las actualizaciones
#         for key, value in data.items():
#             setattr(user, key, value)

#         try:
#             user.save()
#             logger.info(f'Información actualizada para el usuario con correo: {correo}')
#             serializer = UserProfileSerializer(user)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except Exception as e:
#             logger.error(f'Error al guardar la información actualizada: {str(e)}')
#             return Response({'error': 'Error al guardar la información actualizada'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RegisterViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserProfileSerializer
    queryset =  UserProfile.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password']) 
            user.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
   permission_classes = [permissions.IsAuthenticated]

   def post(self, request, format=None):
       request.user.auth_token.delete()
       return Response(status=status.HTTP_200_OK)
   
class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionsSerializer
    queryset =  Questions.objects.all()

class PlacesViewSet(viewsets.ModelViewSet):
    serializer_class = PlacesSerializer
    queryset =  Places.objects.all()


