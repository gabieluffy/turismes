from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.auth import create_user, authenticate_user
from app.models.place import Place
from app.models.user import User
from app.models.persona import Persona
from app.models.favorito import Favorito
from app.services.favoritos_service import FavoritoService
from app.models.avaliacao import Avaliacao
from app.services.avaliacoes_service import AvaliacoesService
from app.models.place import Place
from app.services.recommendation_service import RecommendationService
from app.extensions import db

main = Blueprint("main", __name__)


@main.route("/register", methods=["POST"])
def register():
    data = request.json

    create_user(
        username=data["username"],
        email=data["email"],
        password=data["password"]
    )
    return jsonify({"message": "Usuário criado com sucesso"}), 201

@main.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    return authenticate_user(email=email, password=password)



@main.route("/todos_pontos_turisticos",methods=["GET"])
#@jwt_required()
def todos_pontos_turisticos():

    places = Place.query.all()

    return jsonify([
        Place.to_dict(place)
        for place in places
    ])
def lugar_selcionado(id_place):
    Place.query.first()

# Favoritos

@main.route("/favorito", methods=["POST"])
def criar_favorito():

    data = request.get_json()

    usuario = User.query.get(data["id_user"])
    place = Place.query.get(data["id_place"])

    if not usuario:
        return jsonify({
            "erro": "Usuário não encontrado"
        }), 404

    if not place:
        return jsonify({
            "erro": "Place não encontrado"
        }), 404
    favorito_existente = Favorito.query.filter_by(
        id_user=data["id_user"],
        id_place=data["id_place"]
    ).first()

    if favorito_existente:
        return jsonify({
            "erro": "Favorito já existe"
        }), 409
    favorito = Favorito(
        id_user=data["id_user"],
        id_place=data["id_place"]
    )

    FavoritoService.criar_favorito(favorito=favorito)

    return jsonify(
        favorito.to_dict()
    ), 201

@main.route(
    "/favorito/<int:id_user>/<int:id_place>",
    methods=["DELETE"]
)
def remover_favorito(id_user, id_place):

    removido = FavoritoService.remover_favorito(
        id_user=id_user,
        id_place=id_place
    )

    if not removido:
        return jsonify({
            "erro": "Favorito não encontrado"
        }), 404

    return jsonify({
        "mensagem": "Favorito removido com sucesso"
    }), 200

@main.route("/favorito/<int:id_favorito>", methods=["DELETE"])
def deletar_favorito(id_favorito):

    deletado = FavoritoService.excluir_favorito(id_favorito)

    if not deletado:
        return jsonify({
            "erro": "Favorito não encontrado"
        }), 404

    return jsonify({
        "message": "Favorito removido com sucesso"
    }), 200

@main.route("/favoritos/<int:id_user>", methods=["GET"])
#@jwt_required()
def listar_favoritos_routes(id_user):

    lista = FavoritoService.lista_favoritos(id_user)

    return jsonify([
        fav.to_dict()
        for fav in lista
    ]), 200

# Avaliações

@main.route("/avaliar", methods=["POST"])
def criar_avaliacao_user():
    
    data = request.get_json()

    if AvaliacoesService.verifica(id_user=data["id_user"], id_place=data["id_place"]):

        new_ava = Avaliacao(
            comentario=data["comentario"],
            nota=data["nota"],
            id_user=data["id_user"],
            id_place=data["id_place"]
        )
        AvaliacoesService.criar_avalicao(newavaliacao=new_ava)
        return jsonify({"message":"Avaliação criada"}), 201
    
    return jsonify({"message":"já avliou"}), 400


# Recomendações

@main.route("/roteiro", methods=["POST"])
def criar_roteiro():

    data = request.get_json()

    persona = db.session.get(
        Persona,
        data["user_id"]
    )

    user_lat = data["user_lat"]
    user_lon = data["user_lon"]

    roteiro = RecommendationService.generate_route(
        persona,
        user_lon,
        user_lat
    )

    return jsonify(roteiro), 200
