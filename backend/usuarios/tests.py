from django.test import TestCase
from usuarios.models import UserProfile

# Create your tests here.

class UserProfileModelTest(TestCase):
    def setUp(self):
        self.user_profile = UserProfile.objects.create(
            nombre='John Doe',
            correo='john@example.com',
            contrasena='password123',
            celular='123456789',
            direccion='123 Main St',
            ciudad='Anytown'
        )

    def test_user_profile_creation(self):
        self.assertEqual(self.user_profile.nombre, 'John Doe')
        self.assertEqual(self.user_profile.correo, 'john@example.com')
        self.assertEqual(self.user_profile.contrasena, 'password123')
        self.assertEqual(self.user_profile.celular, '123456789')
        self.assertEqual(self.user_profile.direccion, '123 Main St')
        self.assertEqual(self.user_profile.ciudad, 'Anytown')