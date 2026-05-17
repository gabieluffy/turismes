from flask import Blueprint, request, jsonify, render_template
from flask_jwt_extended import jwt_required
from ..auth import create_user, authenticate_user
from app.models.place import Place

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