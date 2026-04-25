from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required
from .auth import create_user, authenticate_user
from flask import request, render_template, redirect, url_for, flash
from flask_login import login_required, current_user

main = Blueprint("main", __name__)


@main.route("/register", methods=["POST"])
def register():
    data = request.json

    user = create_user(
        username=data["username"],
        email=data["email"],
        password=data["password"]
    )

    return jsonify({"message": "Usuário criado com sucesso"}), 201

@main.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user = authenticate_user(email, password)

        if user:
            login_user(user)
            return redirect(url_for("main.home"))
        else:
            flash("Credenciais inválidas", "error")

    return render_template("login.html")


@main.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout realizado"})

@main.route("/home")
@login_required
def home():
    return render_template("home.html", user=current_user)