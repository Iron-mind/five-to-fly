from rest_framework import serializers
from .models import *

class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = '__all__'

class PlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Places
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
   class Meta:
       model = UserProfile
       fields = '__all__'

class UserRegistrationSerializer(UserProfileSerializer):
  class Meta(UserProfileSerializer.Meta):
      fields = UserProfileSerializer.Meta.fields
      extra_kwargs = {'contrasena': {'write_only': True}}
