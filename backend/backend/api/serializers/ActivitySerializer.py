from rest_framework import serializers
from api.models import Activity

class ActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Activity
        fields = ('id', 'classroom_id', 'team_id', 'title', 'description', 'submission_status', 'date_created', 'due_date', 'evaluation', 'total_score')