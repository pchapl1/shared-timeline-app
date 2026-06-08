from django.db import models
from django.contrib.auth.models import User

from circles.models import Circle


class Trip(models.Model):
    circle = models.ForeignKey(
        Circle,
        on_delete=models.CASCADE,
        related_name='trips'
    )

    title = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    start_date = models.DateField()

    end_date = models.DateField(
        null=True,
        blank=True
    )

    destination_name = models.CharField(
        max_length=255,
        blank=True
    )

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_trips'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_date', '-created_at']

    def __str__(self):
        return self.title