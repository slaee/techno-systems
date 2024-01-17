from rest_framework import viewsets, mixins, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response

from api.models import Chatbot

from api.serializers import ChatbotSerializer

class ChatbotsController(viewsets.GenericViewSet,
                      mixins.ListModelMixin, 
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin):
    
    queryset = Chatbot.objects.all()
    serializer_class = ChatbotSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        return [permissions.IsAuthenticated()]
