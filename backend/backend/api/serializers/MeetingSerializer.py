from rest_framework import serializers
from rest_framework_nested.relations import NestedHyperlinkedRelatedField

from api.models import Meeting

class MeetingSerializer(serializers.ModelSerializer):
    presentors = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    criterias = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Meeting
        fields = '__all__'
        
    def get_presentors(self, obj):
        return PitchSerializer(obj.presentor_id, many=True, context=self.context).data
    
    def get_comments(self, obj):
        return CommentSerializer(obj.meeting_comment_id, many=True).data
    
    def get_criterias(self, obj):
        return MeetingCriteriaSerializer(obj.meeting_criteria_id, many=True).data
    
class PitchSerializer(serializers.ModelSerializer):
    