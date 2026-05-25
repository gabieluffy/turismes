from flask import Blueprint, request, jsonify, render_template
from flask_jwt_extended import jwt_required
from ..auth import create_user, authenticate_user
from app.models.place import Place
from  app.models.user import User
from app.models.favorito import Favorito
from app.services.favoritos_service import FavoritoService
from app.models.avaliacao import Avaliacao
from app.services.avaliacoes_service import AvaliacoesService

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
@jwt_required()
def todos_pontos_turisticos():

    places = Place.query.all()

    return jsonify([
        Place.to_dict(place)
        for place in places
    ])

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

    favorito = Favorito(
        id_user=data["id_user"],
        id_place=data["id_place"]
    )

    FavoritoService.criar_favorito(favorito=favorito)

    return jsonify(
        favorito.to_dict()
    ), 201

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

@main.route("/favoritos", methods=["GET"])
@jwt_required()
def listar_favoritos_routes():

    lista = FavoritoService.lista_favoritos()

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

@main.route("/places", methods=["GET"])
def lugares():
    pass