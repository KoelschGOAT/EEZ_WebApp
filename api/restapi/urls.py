from django.urls import path


from restapi import views
urlpatterns = [
    path("current-pc-videos", views.video_view,name="video_view"),
    path("all-pcs", views.pc_view, name="pc_view"),
    path("video/<int:pk>",views.VideoEditView,name="VideoEditView"),
    path("pc/<int:pk>",views.PcEditView,name="PCSerializer"),
    path("all-videos",views.all_videos_view,name="all_videos_view"),

   
   
]
