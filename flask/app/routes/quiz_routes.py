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
    
    return jsonify(ranking)




# Pergunta
@quiz.get("/quiz/perguntas")
def listar_perguntas():

    perguntas = QuizService.listar_perguntas()

    return jsonify(perguntas), 200