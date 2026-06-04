from django.apps import AppConfig


class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notifications'

    def ready(self):
        """
        Runs when Django starts.

        Importing signals here ensures Django registers all
        notification signal handlers automatically.

        Without this import:
        - signals.py exists
        - but Django never loads it
        - so post_save handlers never run
        """

        import notifications.signals  # noqa: F401