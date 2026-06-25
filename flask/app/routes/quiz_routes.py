from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.services.quiz_service import QuizService

quiz = Blueprint("quiz", __name__)



# Resposta
@quiz.route("/quiz/resultado", methods=["POST"])
def resultado_quiz():
    # {"respostas": [1, 7, 12, 20]}
    
    id =  request.json["id"]
    respostas = request.json["respostas"]

    ranking = QuizService.calcular_resultado(respostas)
    
    QuizService.atualizar_persona(
        usuario_id=id,
        resultado=ranking
    )

    # Enviar para o histórico de do usuário
    QuizService.salvar_historico(usuario_id=id, resultado=ranking)
    
    return jsonify(ranking)




# Pergunta
@quiz.get("/quiz/perguntas")
def listar_perguntas():

    perguntas = QuizService.listar_perguntas()

    return jsonify(perguntas), 200

# Histórico de quiz
@quiz.get("/quiz/historico/<int:id_user>")
def listar_historico_quiz(id_user):
    
    historico = QuizService.buscar_historico_user(usuario_id=id_user)
    
    return jsonify(historico), 200


# Apagar quiz
@quiz.delete("/quiz/deletar/<string:id_quiz>")
def deletar_quiz(id_quiz):
    QuizService.apagar_historico(id_quiz)
    return jsonify({"mesage":"quiz apagaado "}), 200