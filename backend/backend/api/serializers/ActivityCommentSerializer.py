from rest_framework import serializers
from api.models import User
from api.models import ActivityComment, Activity

class UserCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name') 

class SpecificActivityCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'title')
class CommentCreateSerializer(serializers.ModelSerializer):
    # activity = ActivityCommentSerializer()
    # user = UserCommentSerializer()  # Serialize the user field

    class Meta:
        model = ActivityComment
        fields = ('id', 'activity_id', 'user_id', 'comment', 'date_created')  # Include the user field

class ActivityCommentSerializer(serializers.ModelSerializer):
    activity = SpecificActivityCommentSerializer()
    user = UserCommentSerializer()

    class Meta:
        model = ActivityComment
        fields = ('id', 'comment', 'date_added', 'activity', 'user')