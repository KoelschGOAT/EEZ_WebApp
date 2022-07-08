from email import message
import re
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .serializers import VideoSerializer, PCSerializer
from .models import Video,PC
from rest_framework import status
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
# Create your views here.
@csrf_exempt
@api_view(["GET","POST"])
def pc_view(request):
    if request.method == "GET":
        query = PC.objects.all()
        serializer = PCSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        print("request.data",request.data)
        serializer = PCSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@csrf_exempt
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
            return JsonResponse({"message":"PC not found"},status=status.HTTP_401_UNAUTHORIZED)
        #check if PC is active and receiving all videos wich are linked to the PC, otherwise it returns HTTP_404_NOT_FOUND
        
        query=requested_pc.Videos.all()
        
        serializer = VideoSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@csrf_exempt
@api_view(['GET', 'POST'])
def all_videos_view(request):    
    if request.method=="GET":
        query = Video.objects.all()
        serializer = VideoSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK) 


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def VideoEditView(request, pk):

    # Retrieve, update or delete a device.

    try:
        video_entry = Video.objects.get(pk=pk)

    except Video.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = VideoSerializer(video_entry)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = VideoSerializer(video_entry, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        video_entry.delete()
        return HttpResponse(status=204)
@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def PcEditView(request, pk):

    # Retrieve, update or delete a device.

    try:
        pc_entry = PC.objects.get(pk=pk)

    except PC.DoesNotExist:
        return HttpResponse({message:"PC not found"},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PCSerializer(pc_entry)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        print(request.data)
        serializer = PCSerializer(pc_entry, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        pc_entry.delete()
        return HttpResponse({message:"PC deleted"},status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def VideoSelectView(request):
    REMOTE_ADDR = "REMOTE_ADDR"
    client_ip_address = request.META[REMOTE_ADDR]
    """
    Get all Video Objects and add an Object
    """

    if request.method == 'GET':
        #receiving pc wich did the request
        try:
            requested_pc = PC.objects.get(ip_address=client_ip_address)

        except:
            return JsonResponse({"message": "PC not found"}, status=status.HTTP_404_NOT_FOUND)
        #check if PC is active and receiving all videos wich are linked to the PC, otherwise it returns HTTP_404_NOT_FOUND
       
        query = requested_pc.Videos.all()
       
            
        serializer = VideoSerializer(query, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    elif request.method == 'POST':

        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
