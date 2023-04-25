from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    location = models.CharField(max_length=100)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    avatar_url = models.URLField(max_length=200, null=True, blank=True)
    bio = models.TextField(max_length=500, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    reputation = models.IntegerField(default=0)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name", "location"]

    def __str__(self):
        return self.username


class Category(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField(max_length=180)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField(max_length=180)

    def __str__(self):
        return self.name


class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vote_type = models.IntegerField(choices=[(1, 'Upvote'), (-1, 'Downvote')])

    # Add these fields for Generic Foreign Key
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')


class Discussion(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, null=True, blank=True
    )
    status = models.CharField(max_length=20)
    tags = models.ManyToManyField(Tag, blank=True)
    
    votes = GenericRelation(Vote)

    def __str__(self):
        return self.title


class Comment(models.Model):
    content = models.TextField(max_length=500)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True
    )
    
    votes = GenericRelation(Vote)

    def __str__(self):
        return self.content


class Issue(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    
    votes = GenericRelation(Vote)

    def __str__(self):
        return self.title


class Endorsement(models.Model):
    endorser = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="endorsements_made"
    )
    endorsee = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="endorsements_received"
    )
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.endorser} endorsed {self.endorsee} on {self.issue}"


class ExpertAnalysis(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=500)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    votes = GenericRelation(Vote)

    def __str__(self):
        return self.title


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=20)
    element_id = models.IntegerField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

def __str__(self):
    return f"{self.user} - {self.notification_type} - {self.element_id}"
