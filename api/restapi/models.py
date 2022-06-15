from ipaddress import ip_address
from django.db import models
from datetime import datetime
from django.utils import timezone


# Create your models here.
class Video(models.Model):
    video = models.FileField(upload_to="videos/")
    screenshot = models.ImageField(upload_to="screenshots/")
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200)
    published = models.DateTimeField(default=timezone.now)


class PC(models.Model):
    pc_name= models.CharField(max_length=50, unique=True)
    ip_address = models.CharField(max_length=15,unique=True)
    is_active = models.BooleanField(default=True)
    Videos = models.ManyToManyField(Video)

    class Meta:
        ordering = ["ip_address"]
