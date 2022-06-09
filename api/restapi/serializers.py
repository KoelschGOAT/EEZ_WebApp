from rest_framework import serializers
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ("id",
                  "video",
                  "screenshot",
                  "title",
                  "subtitle",
                  "published"
                  )
