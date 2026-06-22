# python -m pytest

def test_structure_opces_pergunta(client):
    response = client.get("/quiz/perguntas")

    assert response.status_code == 200

    data = response.get_json()
    
    assert "alternativas" in data[0]
    assert "id" in data[0]
    assert "titulo" in data[0]

def test_quiz_resultado_numerico(client):
    response = client.post(
        "/quiz/resultado",
        json={"respostas": [1, 7, 12, 20]}
    )

    assert response.status_code == 200

    data = response.get_json()

    assert "categoria" in data[0]
    assert "pontos" in data[0]
