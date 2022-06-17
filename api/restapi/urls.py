from django.urls import path
from . import views
urlpatterns = [
    path("videos", views.video_view,name="video_view"),
    path("pcs", views.pc_view, name="pc_view"),
]
