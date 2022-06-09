from django.urls import path
from . import views
urlpatterns = [

path("resp", views.index, name="index"),
path("videos", views.video_view,name="video_view")
]
