from flask import Blueprint, render_template
from flask_login import login_required, current_user

from app.services.recommendation_service import RecommendationService

recommendation_bp = Blueprint(
    "recommendation",
    __name__
)

@recommendation_bp.route("/recommendations")
@login_required
def recommendations():

    places = RecommendationService.get_recommendations(
        current_user
    )

    return render_template(
        "recommendations.html",
        places=places
    )