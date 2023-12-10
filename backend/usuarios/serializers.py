from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
   class Meta:
       model = UserProfile
       fields = '__all__'

class UserRegistrationSerializer(UserProfileSerializer):
  class Meta(UserProfileSerializer.Meta):
      fields = UserProfileSerializer.Meta.fields
      extra_kwargs = {'contrasena': {'write_only': True}}
