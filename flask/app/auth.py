from .models.user import User
from .extensions import db, bcrypt
from flask_jwt_extended import (create_access_token)
from flask import jsonify

def create_user(username, email, password):
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    user = User(
        username=username,
        email=email,
        password=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    return user


def authenticate_user(email, password):
    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return jsonify({
            "error": "Usuário não encontrado"
        }), 401

    if not bcrypt.check_password_hash(
        user.password,
        password
    ):
        return jsonify({
            "error": "Senha inválida"
        }), 401

    access_token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    })
