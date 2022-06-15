from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .serializers import VideoSerializer
from .models import Video,PC
from rest_framework import status

from django.http import HttpResponse, JsonResponse
# Create your views here.
def index(request):

    return HttpResponse("hello world")

@api_view(['GET', 'POST'])
def video_view(request):    
    REMOTE_ADDR="REMOTE_ADDR"    
    client_ip_address=request.META[REMOTE_ADDR]
    """
    Get all Video Objects and add an Object
    """
    
    if request.method == 'GET':
        
        requested_pc = PC.objects.get(ip_address=client_ip_address)
        query=requested_pc.Videos.all()
        #queryset = Video.objects.all()
        serializer = VideoSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)