from rest_framework import serializers
from api.models import Activity

class ActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Activity
        fields = ('id', 'title', 'description', 'date_added', 'submission_status', 'due_date', 'activity_team', 'evaluation', 'total_score')