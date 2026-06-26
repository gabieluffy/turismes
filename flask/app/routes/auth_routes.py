from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, UTC

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
from app.services.auth_service import UserService
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

#   Editar dados user
@main.put("/usuario/<int:id_usuario>")
def editar_usuario(id_usuario):

    dados = request.get_json()

    usuario = UserService.editar_usuario(
        id_usuario=id_usuario,
        username=dados.get("username"),
        email=dados.get("email"),
        telefone=dados.get("telefone"),
        cidade=dados.get("cidade"),
        bio=dados.get("bio")
    )

    if not usuario:
        return jsonify({
            "erro": "Usuário não encontrado"
        }), 404

    return jsonify(usuario.to_dict()), 200

@main.get("/usuario/<int:id_user>")
def buscar_usuario(id_user):

    usuario = User.query.get(id_user)

    if not usuario:
        return {"erro": "Usuário não encontrado"}, 404

    return {
        "username": usuario.username,
        "email": usuario.email,
        "telefone": usuario.telefone,
        "cidade": usuario.cidade,
        "bio": usuario.bio
    }, 200

@main.route("/auth/esqueci-senha", methods=["POST"])
def esqueci_senha():

    data = request.get_json()

    UserService.gerar_token_recuperacao(
        data["email"]
    )

    return jsonify({
        "mensagem":
        "Se existir uma conta com esse e-mail, enviaremos um link para recuperação."
    }),200


@main.route("/auth/redefinir-senha", methods=["POST"])
def redefinir_senha():

    data = request.get_json()

    token = data.get("token")
    nova_senha = data.get("nova_senha")

    if not token or not nova_senha:
        return jsonify({
            "erro": "Dados inválidos"
        }), 400

    sucesso = UserService.redefinir_senha(
        token,
        nova_senha
    )

    if not sucesso:
        return jsonify({
            "erro": "Token inválido ou expirado"
        }), 400

    return jsonify({
        "mensagem": "Senha alterada com sucesso"
    }), 200



@main.route("/auth/validar-token/<token>", methods=["GET"])
def validar_token_route(token):

    usuario = UserService.validar_token(token)

    if usuario is None:
        return jsonify({
            "erro": "Token inválido ou expirado"
        }), 400

    return jsonify({
        "mensagem": "Token válido"
    }), 200