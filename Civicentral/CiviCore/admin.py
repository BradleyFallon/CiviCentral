from django.contrib import admin

from .models import User, Discussion, Comment, Vote, Issue, Endorsement, ExpertAnalysis, Notification, Category

"""
Models defined are:
    User
    Discussion
    Comment
    Vote
    Issue
    Endorsement
    ExpertAnalysis
    Notification
    Category
"""

admin.site.register(User)
admin.site.register(Discussion)
admin.site.register(Comment)
admin.site.register(Vote)
admin.site.register(Issue)
admin.site.register(Endorsement)
admin.site.register(ExpertAnalysis)
admin.site.register(Notification)
admin.site.register(Category)