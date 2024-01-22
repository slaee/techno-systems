import os
from rest_framework import viewsets, mixins, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from openai import OpenAI
from django.db.models import Sum, F

from api.custom_permissions import IsTeacher

from api.models import Meeting, ClassMember, Remark, Rating, Feedback

from api.serializers import MeetingSerializer, MeetingCommentSerializer, MeetingCriteriaSerializer, MeetingPresentorSerializer, RatingSerializer, RemarkSerializer, FeedbackSerializer, NoneSerializer

class MeetingsController(viewsets.GenericViewSet,
                      mixins.ListModelMixin, 
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin):
    
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in ['create','destroy', 'update', 'partial_update']:
            return [permissions.IsAuthenticated(), IsTeacher()]
        elif self.action in ['retrieve', 'list', 'join']:
            return [permissions.IsAuthenticated()]

        return super().get_permissions()
    
    @swagger_auto_schema(
        operation_summary="List all meetings under a classroom.",
        operation_description="POST /meetings/?classroom=classroom&status=status",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    def list(self, request):
        queryset = self.queryset
        status_param = self.request.query_params.get('status', None)
        classroom_param = self.request.query_params.get('classroom', None)

        if classroom_param:
            queryset = queryset.filter(classroom_id=classroom_param)

        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset

    @swagger_auto_schema(
        operation_summary="Creates a new comment for the specific meeting.",
        operation_description="POST /meetings/{id}/comments",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingCommentSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['POST'])
    def add_comment(self, request, *args, **kwargs):
        meeting = self.get_object()

        try:
            classmember = ClassMember.objects.filter(user_id=request.user)

            request.data['classmember_id'] = classmember.id

            comment_serializer = MeetingCommentSerializer(data=request.data)

            if comment_serializer.is_valid():
                comment_serializer.save()
                meeting.meeting_comment_id.add(comment_serializer.data['id'])
                return Response(comment_serializer.data, status=status.HTTP_201_CREATED)
            return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ClassMember.DoesNotExist:
            return Response({'details': 'Class member not found'}, status=status.HTTP_404_NOT_FOUND)
            
    @swagger_auto_schema(
        operation_summary="List comments for the specific meeting.",
        operation_description="GET /meetings/{id}/comments",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingCommentSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['GET'])
    def get_comments(self, request, *args, **kwargs):
        meeting = self.get_object()

        comment_serializer = MeetingCommentSerializer(meeting.meeting_comment_id.all(), many=True)

        return Response(comment_serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_summary="Add a new pitch as presentors for the specific meeting.",
        operation_description="POST /meetings/{id}/presentors/",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingPresentorSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['POST'])
    def add_presentor(self, request, *args, **kwargs):
        meeting = self.get_object()

        request.data['meeting_id'] = meeting.id

        presentor_serializer = MeetingPresentorSerializer(data=request.data)

        if presentor_serializer.is_valid():
            presentor_serializer.save()
            meeting.meeting_presentor_id.add(presentor_serializer.data['id'])
            return Response(presentor_serializer.data, status=status.HTTP_201_CREATED)
        return Response(presentor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    @swagger_auto_schema(
        operation_summary="List presentors for the specific meeting.",
        operation_description="GET /meetings/{id}/presentors/",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingPresentorSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['GET'])
    def get_presentors(self, request, *args, **kwargs):
        meeting = self.get_object()

        presentor_serializer = MeetingPresentorSerializer(meeting.meeting_presentor_id.all(), many=True)

        return Response(presentor_serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_summary="Add a new criterias for the specific meeting.",
        operation_description="POST /meetings/{id}/criterias/",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingCriteriaSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['POST'])
    def add_criteria(self, request, *args, **kwargs):
        meeting = self.get_object()

        request.data['meeting_id'] = meeting.id

        criteria_serializer = MeetingCriteriaSerializer(data=request.data)

        if criteria_serializer.is_valid():
            criteria_serializer.save()
            meeting.meeting_criteria_id.add(criteria_serializer.data['id'])
            return Response(criteria_serializer.data, status=status.HTTP_201_CREATED)
        return Response(criteria_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    @swagger_auto_schema(
        operation_summary="List criterias for the specific meeting.",
        operation_description="GET /meetings/{id}/criterias/",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingPresentorSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['GET'])
    def get_criterias(self, request, *args, **kwargs):
        meeting = self.get_object()

        meeting_criteria_id = MeetingCriteriaSerializer(meeting.meeting_criteria_id.all(), many=True)

        return Response(meeting_criteria_id.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_summary="Add a score/rating to the presentors for the specific meeting.",
        operation_description="POST /meetings/{id}/add_rating_to_pitch/",
        request_body=RatingSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', RatingSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['POST'])
    def add_rating_to_pitch(self, request, *args, **kwargs):
        meeting = self.get_object()

        request.data['meeting_id'] = meeting.id

        rating_serializer = RatingSerializer(data=request.data)

        if rating_serializer.is_valid():
            rating_serializer.save()
            return Response(rating_serializer.data, status=status.HTTP_201_CREATED)
        return Response(rating_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        operation_summary="Add a reamark to the presentors for the specific meeting.",
        operation_description="POST /meetings/{id}/add_remark_to_pitch/",
        request_body=RemarkSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', RemarkSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['POST'])
    def add_remark_to_pitch(self, request, *args, **kwargs):
        meeting = self.get_object()

        request.data['meeting_id'] = meeting.id

        rating_serializer = RemarkSerializer(data=request.data)

        if rating_serializer.is_valid():
            rating_serializer.save()
            return Response(rating_serializer.data, status=status.HTTP_201_CREATED)
        return Response(rating_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        operation_summary="Summarize the reamarks of the presentors for the specific meeting.",
        operation_description="POST /meetings/{id}/summarize_presentors_remarks/",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingPresentorSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['POST'])
    def summarize_presentors_remarks(self, request, *args, **kwargs):
        meeting = self.get_object()

        presentors = MeetingPresentorSerializer(meeting.meeting_presentor_id.all(), many=True).data

        for presentor in presentors:
            remarks = RemarkSerializer(Remark.objects.filter(meeting_id=meeting.id, pitch_id=presentor['pitch_id']), many=True).data    
            prompt = '\n\n'.join(remark['remark'] for remark in remarks if 'remark' in remark)

            complete_prompt = f'Please provide a concise summary of the remarks. Highlight key strengths and areas for improvement mentioned by each evaluator. Provide it into a single paragraph.{prompt}'

            client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))
            openai_response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{
                    'role': 'user', 'content': complete_prompt
                }],
                temperature=0
            )

            feedback = {
                'pitch': presentor['pitch_id'],
                'meeting': meeting.id,
                'feedback': openai_response.choices[0].message.content
            }

            feedback_serializer = FeedbackSerializer(data=feedback)

            if not feedback_serializer.is_valid():
                return Response(feedback_serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
    
            feedback_serializer.save()
            presentor['feedback'] = feedback_serializer.data

            return Response(presentors, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_summary="List all of the rating to the presentors for the specific meeting.",
        operation_description="GET /meetings/{id}/rating_history/",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingPresentorSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['GET'])
    def get_rating_history(self, request, *args, **kwargs):
        meeting = self.get_object()

        presentors = MeetingPresentorSerializer(meeting.meeting_presentor_id.all(), many=True).data
        criterias = MeetingCriteriaSerializer(meeting.meeting_criteria_id.all(), many=True).data

        
        for presentor in presentors:
            ratings = Rating.objects.filter(meeting_id=meeting.id, pitch_id=presentor['pitch_id']).annotate(
                total_rating=Sum(F('rating') * F('meeting_criteria_id__weight') * (
                    meeting.teacher_weight_score if F('classmember_id__role') == 0 else meeting.student_weight_score
                ))
            ).values('meeting_criteria_id__name', 'total_rating')

            scores_by_criteria = {criteria['criteria']['name']: 0 for criteria in criterias}

            scores_by_criteria.update({rating['meeting_criteria_id__name']: rating['total_rating'] for rating in ratings})

            overall_score = 0
            for criteria in criterias:
                overall_score = overall_score + (scores_by_criteria[criteria['criteria']['name']] * criteria['weight'])

            presentor['score'] = scores_by_criteria
            presentor['overall_score'] = overall_score

        return Response(presentors, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="List all of the remarks to the presentors for the specific meeting.",
        operation_description="GET /meetings/{id}/remark_history/",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingPresentorSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['GET'])
    def get_remark_history(self, request, *args, **kwargs):
        meeting = self.get_object()

        presentors = MeetingPresentorSerializer(meeting.meeting_presentor_id.all(), many=True).data

        for presentor in presentors:
            remarks = RemarkSerializer(Remark.objects.filter(meeting_id=meeting.id, pitch_id=presentor['pitch_id']), many=True).data   
            presentor['remarks'] = remarks
        return Response(presentors, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_summary="List all of the feedbacks to the presentors for the specific meeting.",
        operation_description="GET /meetings/{id}/feedback_history/",
        request_body=NoneSerializer,
        responses={
            status.HTTP_201_CREATED: openapi.Response('Created', MeetingPresentorSerializer),
            status.HTTP_400_BAD_REQUEST: openapi.Response('Bad Request'),
            status.HTTP_401_UNAUTHORIZED: openapi.Response('Unauthorized'),
            status.HTTP_403_FORBIDDEN: openapi.Response('Forbidden'),
            status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response('Internal Server Error'),
        }
    )
    @action(detail=True, methods=['GET'])
    def get_feedback_history(self, request, *args, **kwargs):
        meeting = self.get_object()

        presentors = MeetingPresentorSerializer(meeting.meeting_presentor_id.all(), many=True).data

        for presentor in presentors:
            feedback = FeedbackSerializer(Feedback.objects.get(meeting_id=meeting.id, pitch_id=presentor['pitch_id'])).data   
            presentor['feedback'] = feedback
        return Response(presentors, status=status.HTTP_200_OK)
