from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSearchSerializer
from django.contrib.auth import get_user_model
from django.db.models import Q


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # Allow anyone to access this view

User = get_user_model()

class UserSearchView(generics.ListAPIView):
    serializer_class = UserSearchSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = self.request.query_params.get('q', '').strip()

        if not query: 

            return User.objects.none()  # Return an empty queryset if the query is empty
        
        return (
            User.objects.filter(
                Q(username__icontains=query) | Q(email__icontains=query)
            )
            .exclude(id=self.request.user.id)  # Exclude the current user from the search results
            .order_by('username')[:10]  # Limit to 10 results and order by username
        )