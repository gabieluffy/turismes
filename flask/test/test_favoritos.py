# python -m pytest

from app.services.favoritos_service import FavoritoService
from app.models.favorito import Favorito

def test_get_favorites(app):
    favoritos = FavoritoService.lista_favoritos(usuario_id=1)

    for fav in favoritos:
        assert fav.id is not None
        assert fav.user is not None
        assert fav.place is not None


def test_get_favorites(client):
    response = client.get("/favoritos")

    assert response.status_code == 200

    data = response.get_json()

    assert isinstance(data, list)

    for fav in data:
        assert "id" in fav
        assert "user" in fav
        assert "place" in fav