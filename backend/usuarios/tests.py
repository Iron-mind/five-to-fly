from django.test import TestCase
from django.utils import timezone
from usuarios.models import UserProfile, Questions, Places, Role

# Create your tests here.

class UserProfileTest(TestCase):
    def setUp(self):
        self.user_profile = UserProfile.objects.create(
            username='testuser',
            correo='test@example.com',
            celular='123456789',
            direccion='Test Address',
            ciudad='Test City',
            lastForm=['Colombia', 'Tokyo','Peru'],
            img='https://example.com/test.jpg',
            rate=4
        )

    def test_user_profile_creation(self):
        self.assertEqual(self.user_profile.username, 'testuser')
        self.assertEqual(self.user_profile.correo, 'test@example.com')
        self.assertEqual(self.user_profile.celular, '123456789')
        self.assertEqual(self.user_profile.direccion, 'Test Address')
        self.assertEqual(self.user_profile.ciudad, 'Test City')
        self.assertEqual(self.user_profile.lastForm, ['Colombia', 'Tokyo','Peru'])
        self.assertEqual(self.user_profile.img, 'https://example.com/test.jpg')
        self.assertEqual(self.user_profile.rate, 4)


class QuestionsTest(TestCase):
    def setUp(self):
        self.question = Questions.objects.create(
            texto='What is your favorite color?'
            # Agrega más campos según sea necesario
        )

    def test_questions_creation(self):
        self.assertEqual(self.question.texto, 'What is your favorite color?')

class PlacesTest(TestCase):
    def setUp(self):
        self.place = Places.objects.create(
            name='Test Place',
            img='https://example.com/place.jpg',
            description='A description of the test place.',
            weights=[1, 2, 3]
            # Agrega más campos según sea necesario
        )

    def test_places_creation(self):
        self.assertEqual(self.place.name, 'Test Place')
        self.assertEqual(self.place.img, 'https://example.com/place.jpg')
        self.assertEqual(self.place.description, 'A description of the test place.')
        self.assertEqual(self.place.weights, [1, 2, 3])

class RoleTest(TestCase):
    def setUp(self):
        self.role = Role.objects.create(
            name='Test Role',
            description='A description of the test role.'
            # Agrega más campos según sea necesario
        )

    def test_role_creation(self):
        self.assertEqual(self.role.name, 'Test Role')
        self.assertEqual(self.role.description, 'A description of the test role.')