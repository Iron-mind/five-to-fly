# Generated by Django 3.2.8 on 2023-12-10 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0007_userprofile_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='opinion',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]