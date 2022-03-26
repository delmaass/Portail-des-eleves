import django_filters
from django.db.models import Sum
from django.db.models.functions import Coalesce

from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework import pagination, mixins, viewsets
from authentication.models.user import User
from games.serializers.scores import ScoreSerializer, LeaderboardSerializer
from games.models.game import Game

from games.models.scores import Score


class ScorePagination(pagination.PageNumberPagination):
    page_size = 5


class ScoreFilter(django_filters.FilterSet):
    game = django_filters.ModelChoiceFilter(
        field_name="game__id", queryset=Game.objects.all()
    )
    user = django_filters.ModelChoiceFilter(
        field_name="user__id", queryset=User.objects.all()
    )

    class Meta:
        model = Score
        fields = ("game", "user")


class ScoreViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Score.objects.all()
    filterset_class = ScoreFilter
    serializer_class = ScoreSerializer
    pagination_class = ScorePagination
    permission_classes = [IsAuthenticated]
    ordering = ["-when"]

class ActionBasedPermission(AllowAny):
    """
    Grant or deny access to a view, based on a mapping in view.action_permissions
    """
    def has_permission(self, request, view):
        for klass, actions in getattr(view, 'action_permissions', {}).items():
            if view.action in actions:
                return klass().has_permission(request, view)
        return False

class LeaderboardViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = (
        Score.objects.values("user")
        .annotate(total_score=Coalesce(Sum("score"), 0))
        .order_by("-total_score")
    )
    filterset_class = ScoreFilter
    serializer_class = LeaderboardSerializer
    pagination_class = ScorePagination

    permission_classes = (ActionBasedPermission,)
    action_permissions = {
        IsAuthenticated: ['list'],
        IsAdminUser: ['create']
    }
