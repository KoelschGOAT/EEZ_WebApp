import graphene
from graphene_django import DjangoObjectType

from .models import PC,Video


class VideoType(DjangoObjectType):
    class Meta:
        model = Video
        fields = ("__all__")


class PCType(DjangoObjectType):
    class Meta:
        model = PC
        fields = ("id",
                  "pc_name",
                  "ip_address",
                  "is_active", 
                  )


class Query(graphene.ObjectType):
    all_pcs = graphene.List(PCType)
   

    def resolve_all_PCs(root, info):
        # We can easily optimize query count in the resolve method
        return PC.objects.all()

    

schema = graphene.Schema(query=Query)
