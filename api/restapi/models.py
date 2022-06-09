from django.db import models
from datetime import datetime
# Create your models here.
class Video(models.Model):
    video = models.FileField(upload_to="videos/")
    screenshot = models.ImageField(upload_to="screenshots/")
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200)
    published = models.DateTimeField(default=datetime.now())
