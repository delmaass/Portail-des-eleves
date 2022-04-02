from django.urls import path
from rest_framework_bulk.routes import BulkRouter
from games.views.scores import LeaderboardViewSet, ScoreViewSet
from .views import GameViewSet

router = BulkRouter()

router.register(r"scores/leaderboard", LeaderboardViewSet)
router.register(r"scores", ScoreViewSet)

router.register(r"game", GameViewSet)

urlpatterns = []
urlpatterns += router.urls
