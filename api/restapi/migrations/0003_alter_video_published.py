# Generated by Django 4.0.4 on 2022-06-13 09:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0002_alter_video_published'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='published',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
