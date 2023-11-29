# Generated by Django 4.2.1 on 2023-11-27 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Questions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Question', models.CharField(max_length=255)),
                ('Answer1', models.CharField(max_length=255)),
                ('Answer2', models.CharField(max_length=255)),
                ('Answer3', models.CharField(max_length=255)),
                ('Answer4', models.CharField(max_length=255)),
                ('Answer5', models.CharField(max_length=255)),
            ],
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
