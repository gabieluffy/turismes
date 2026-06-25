# python -m pytest
from app.models.quizuser import QuizUser
from app.services.quiz_service import QuizService


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
        json={
            "id": 1,
            "respostas": [1, 7, 12, 20]
        }
    )

    assert response.status_code == 200

    data = response.get_json()

    assert "categoria" in data[0]
    assert "pontos" in data[0]

def test_salvar_historico(app):
    fake = {"id_categoria": 3, "pontos": 3}
    resultado = QuizService.salvar_historico(1, [fake])

    # se o método retorna lista de UserPreference
    assert isinstance(resultado[0], QuizUser)
    assert resultado[0].usuario_id == 1
    assert resultado[0].categoria_id == 3
    assert resultado[0].pontuacao == 3
