from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    index,
    get_comments,
    create_comment,
    vote,
    UserViewSet,
    CategoryViewSet,
    DiscussionViewSet,
    CommentViewSet,
    IssueViewSet,
    VoteViewSet,
    EndorsementViewSet,
    ExpertAnalysisViewSet,
    NotificationViewSet,
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'discussions', DiscussionViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'issues', IssueViewSet)
router.register(r'votes', VoteViewSet)
router.register(r'endorsements', EndorsementViewSet)
router.register(r'expert_analyses', ExpertAnalysisViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path("api/discussions/<int:discussion_id>/comments/", get_comments),
    path("api/discussions/<int:discussion_id>/comments/create/", create_comment, name='create_comment'),
    path("api/vote", vote, name="vote"),
    path("", index, name="index"),
]
