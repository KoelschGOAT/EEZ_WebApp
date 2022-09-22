from django.db import models
from django.utils import timezone
from django.core.validators import validate_ipv4_address

# Create your models here.


class Video(models.Model):
    video = models.FileField(upload_to="videos/", blank=True, null=True)
    screenshot = models.ImageField(
        upload_to="screenshots/", blank=True, null=True)
    published = models.DateTimeField(default=timezone.now)
    title_de = models.CharField(max_length=200, default=None)
    title_en = models.CharField(max_length=200, default=None)
    text_de = models.TextField(max_length=20000, default=None)
    text_en = models.TextField(max_length=20000, default=None)

    def __str__(self):
        return '%s: %s: %s' % (self.title_de, self.title_en,self.video.name)


class PC(models.Model):
    pc_name = models.CharField(max_length=50, unique=True)
    ip_address = models.CharField(
        max_length=15, unique=True,validators=[validate_ipv4_address])

    Videos = models.ManyToManyField(Video,blank=True)
    is_expo_client = models.BooleanField(default=False)

    class Meta:
        ordering = ["ip_address"]

    def __str__(self):
        return '%s: %s' % (self.pc_name, self.ip_address)
