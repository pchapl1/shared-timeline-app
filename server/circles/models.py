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

    is_archived = models.BooleanField(default=False)

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
    
class CircleInvite(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]

    circle = models.ForeignKey(
        Circle,
        on_delete=models.CASCADE,
        related_name='invites'
    )

    invited_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_circle_invites'
    )

    invited_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_circle_invites'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    responded_at = models.DateTimeField(
        null=True,
        blank=True
    )

    class Meta:
        unique_together = ('circle', 'invited_user')

    def __str__(self):
        return f"{self.invited_user.username} invited to {self.circle.name}"