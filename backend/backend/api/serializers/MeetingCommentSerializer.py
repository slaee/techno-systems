from rest_framework import serializers

from api.models import MeetingComment

class MeetingCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingComment
        fields = '__all__'