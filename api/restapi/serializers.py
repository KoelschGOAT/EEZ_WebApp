from rest_framework import serializers
from .models import PC, Video



class VideoSerializer( serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ("__all__")


class PCSerializer( serializers.ModelSerializer):
    Videos = VideoSerializer(many=True, read_only=True)
    
    class Meta:
        model = PC
        fields = ("id",
                  "pc_name",
                  "ip_address",
                  "is_active", 
                  "is_exhibition",
                  "Videos")
    
    class VideoSelectionSerializer( serializers.ModelSerializer):
        class Meta:
            model = Video
            fields = ("id")
