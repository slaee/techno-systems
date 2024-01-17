from rest_framework import serializers
from api.models import ActivityWorkAttachment
from api.models import Activity

class ActivityWorkAttachmentSerializer(serializers.ModelSerializer):
    activity_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = ActivityWorkAttachment
        fields = ['id', 'activity_id', 'description', 'file_attachment', 'date_created']
        read_only_fields = ['date_created'] 

    def create(self, validated_data):
        activity_id = validated_data.pop('activity_id')

        try:
            activity = Activity.objects.get(pk=activity_id)
        except Activity.DoesNotExist:
            raise serializers.ValidationError("Activity not found")

        # Create the Work instance with the associated Activity
        work = ActivityWorkAttachment(**validated_data)
        work.activity = activity
        work.save()
        return work