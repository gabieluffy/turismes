# python -m pytest

from app import create_app
from app.services.recommendation_service import RecommendationService
from app.models.persona import Persona
from app.models.categoria import Categoria
from app.models.place import Place





def test_generate_route_only_beaches(app): 

        persona = Persona(
            likes_beach=True,
            likes_mountains=False,
            likes_food=False,
            likes_history=False,
            likes_nature=False
        )

        route = RecommendationService.generate_route(
            persona,
            -40.391,
            -20.372
        )

        assert len(route) > 0
        for stop in route:

          assert "badge" in stop
          assert "title" in stop
          assert "cat" in stop

          assert "PRAIA" in stop["cat"]

def test_route_structure(app):

    

        persona = Persona.query.first()

        route = RecommendationService.generate_route(
            persona,
            -40.391,
            -20.372
        )

        first_stop = route[0]

        assert "badge" in first_stop
        assert "title" in first_stop
        assert "desc" in first_stop
        assert "img" in first_stop
        assert "cat" in first_stop
        assert "next" in first_stop


def test_route_respects_persona_preferences(app):

    

        persona = Persona(
            likes_beach=True,
            likes_mountains=False,
            likes_food=False,
            likes_history=False,
            likes_nature=False
        )

        route = RecommendationService.generate_route(
            persona,
            -40.391,
            -20.372
        )

        for stop in route:

            assert "PRAIA" in stop["cat"]

def test_post_roteiro(client):

    response = client.post(
        "/roteiro",
        json={
            "user_id": 1,
            "user_lat": -20.372,
            "user_lon": -40.391
        }
    )

    assert response.status_code == 200

    assert response.status_code == 200

    data = response.get_json()

    assert isinstance(data, list)

    assert len(data) > 0



def test_is_compatible_beach():

    persona = Persona(
        likes_beach=True
    )

    praia = Categoria(nome="PRAIA")

    place = Place(
        name="Praia da Costa"
    )

    place.categorias = [praia]

    assert RecommendationService.is_compatible(
        persona,
        place
    ) is True


def test_is_not_compatible():

    persona = Persona(
        likes_beach=True
    )

    montanha = Categoria(nome="MONTANHA")

    place = Place(
        name="Pedra Azul"
    )

    place.categorias = [montanha]

    assert RecommendationService.is_compatible(
        persona,
        place
    ) is False


def test_calculate_score_beach():

    persona = Persona(
        likes_beach=True
    )

    praia = Categoria(nome="PRAIA")

    place = Place(
        average_rating=4.8
    )

    place.categorias = [praia]

    score = RecommendationService.calculate_score(
        persona,
        place
    )

    assert score > 0



def test_calculate_distance():

    dist = RecommendationService.calculate_distance(
        -20.372,
        -40.391,
        -20.372,
        -40.391
    )

    assert dist == 0

def test_apply_distance_bonus():

    score = RecommendationService.apply_distance_bonus(
        score=20,
        dist=2
    )

    assert score == 50