from django.contrib import admin

from .models import Activity


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'actor',
        'circle',
        'activity_type',
        'created_at',
    )

    list_filter = (
        'activity_type',
        'circle',
    )

    search_fields = (
        'actor__username',
        'circle__name',
    )