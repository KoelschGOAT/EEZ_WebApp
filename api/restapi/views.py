from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .serializers import VideoSerializer
from .models import Video
from rest_framework import status

from django.http import HttpResponse, JsonResponse
# Create your views here.
def index(request):

    return HttpResponse("hello world")

@api_view(['GET', 'POST'])
def video_view(request):


    """
    Get all non defect Devices and add a Device
    """
    if request.method == 'GET':

        queryset = Video.objects.all()
        serializer = VideoSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = VideoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)