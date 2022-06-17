from rest_framework import serializers
from .models import PC, Video

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
class PCSerializer(serializers.ModelSerializer):
    Videos = VideoSerializer(many=True)
    class Meta:
        model = PC
        fields = ("id",
        "pc_name",
        "ip_address",
        "is_active",
        "Videos")
