# python -m pytest

def test_all_places(client):
    response = client.get("/todos_pontos_turisticos")

    assert response.status_code == 200

    data = response.get_json()

    assert isinstance(data, list)

    assert len(data) > 0