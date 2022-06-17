import re
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .serializers import VideoSerializer, PCSerializer
from .models import Video,PC
from rest_framework import status

from django.http import HttpResponse, JsonResponse
# Create your views here.
@api_view(["GET","POST"])
def pc_view(request):
    if request.method == "GET":
        query = PC.objects.all()
        serializer = PCSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def video_view(request):    
    REMOTE_ADDR="REMOTE_ADDR"    
    client_ip_address=request.META[REMOTE_ADDR]
    """
    Get all Video Objects and add an Object
    """
    
    if request.method == 'GET':
        #receiving pc wich did the request
        try:
            requested_pc = PC.objects.get(ip_address=client_ip_address)
           
        except:
            return JsonResponse({"message":"PC not found"},status=status.HTTP_404_NOT_FOUND)
        #check if PC is active and receiving all videos wich are linked to the PC, otherwise it returns HTTP_404_NOT_FOUND
        if requested_pc.is_active ==True:
            query=requested_pc.Videos.all()
        else:
            return JsonResponse({"message":"PC not active"},status=status.HTTP_404_NOT_FOUND)
        serializer = VideoSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)