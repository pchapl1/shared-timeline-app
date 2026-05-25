from django.db import models
from django.contrib.auth.models import User


class Circle(models.Model):
    CIRCLE_TYPES = [
        ('couple', 'Couple'),
        ('friends', 'Friends'),
        ('family', 'Family'),
        ('travel_group', 'Travel Group'),
    ]

    name = models.CharField(max_length=255)

    circle_type = models.CharField(
        max_length=20,
        choices=CIRCLE_TYPES
    )

    start_date = models.DateField()

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_circles'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class CircleMember(models.Model):
    ROLE_CHOICES = [
        ('owner', 'Owner'),
        ('admin', 'Admin'),
        ('member', 'Member'),
    ]

    circle = models.ForeignKey(
        Circle,
        on_delete=models.CASCADE,
        related_name='members'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='circle_memberships'
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='member'
    )

    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.circle.name}"