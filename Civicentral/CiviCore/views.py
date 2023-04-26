from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


from .models import (
    User,
    Category,
    Discussion,
    Comment,
    Issue,
    Vote,
    Endorsement,
    ExpertAnalysis,
    Notification,
)
from .serializers import (
    UserSerializer,
    CategorySerializer,
    DiscussionSerializer,
    CommentSerializer,
    IssueSerializer,
    VoteSerializer,
    EndorsementSerializer,
    ExpertAnalysisSerializer,
    NotificationSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class DiscussionViewSet(viewsets.ModelViewSet):
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


@api_view(["GET"])
def get_comments(request, discussion_id):
    comments = Comment.objects.filter(discussion=discussion_id)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_comment(request, discussion_id):
    data = request.data

    # Fetch the User instance by ID
    user_id = data.get("created_by")
    user = User.objects.get(id=user_id)

    # Pass the user instance as an additional context to the serializer
    serializer = CommentSerializer(data=data, context={"created_by": user})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

@api_view(["POST"])
def vote(request):
    print("vote")
    print(request.data)
    data = request.data
    user_id = data.get("user")
    vote_type = data.get("vote_type")
    content_type = data.get("content_type")
    # content_type can be "comment" or "issue"
    object_id = data.get("object_id")

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        print("User.DoesNotExist")
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        content_type_obj = ContentType.objects.get(
            app_label="CiviCore", model=content_type
        )
    except ContentType.DoesNotExist:
        print("ContentType.DoesNotExist")
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        content_object = content_type_obj.get_object_for_this_type(id=object_id)
    except content_type_obj.model_class().DoesNotExist:
        print("content_type_obj.model_class().DoesNotExist")
        return Response(status=status.HTTP_404_NOT_FOUND)

    vote = Vote(user=user, vote_type=vote_type, content_object=content_object)
    vote.save()

    return Response(status=status.HTTP_201_CREATED)


class EndorsementViewSet(viewsets.ModelViewSet):
    queryset = Endorsement.objects.all()
    serializer_class = EndorsementSerializer


class ExpertAnalysisViewSet(viewsets.ModelViewSet):
    queryset = ExpertAnalysis.objects.all()
    serializer_class = ExpertAnalysisSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
