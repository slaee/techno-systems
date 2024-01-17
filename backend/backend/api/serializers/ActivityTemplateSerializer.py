from rest_framework import serializers
from api.models import ActivityTemplate

class TemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ActivityTemplate
        fields = ('__all__')