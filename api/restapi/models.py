from ipaddress import ip_address
from django.db import models
from datetime import datetime
from django.utils import timezone
# Create your models here.
class Video(models.Model):
    video = models.FileField(upload_to="videos/")
    screenshot = models.ImageField(upload_to="screenshots/")
    published = models.DateTimeField(default=timezone.now)
    title_de = models.CharField(max_length=200, default=None)
    title_en = models.CharField(max_length=200, default=None)
    text_de = models.TextField(max_length=20000,default=None)
    text_en = models.TextField(max_length=20000,default=None)


    def __str__(self):
        return '%s: %s' % (self.title_de, self.title_en)
    


class PC(models.Model):
    pc_name= models.CharField(max_length=50, unique=True)
    ip_address = models.CharField(
        max_length=15, unique=True)
    is_active = models.BooleanField(default=True)
    Videos = models.ManyToManyField(Video)
   
    class Meta:
        ordering = ["ip_address"]

    def __str__(self):
        return '%s: %s' % (self.pc_name, self.ip_address)
