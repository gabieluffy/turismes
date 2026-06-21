from flask import Blueprint, request, jsonify, render_template
from app.services.grafics_services import GraficsService

grafic = Blueprint("grafic", __name__)






@grafic.route("/grafico_categorias",methods=["GET"])
def grafico_categorias():

    categorias = GraficsService.grafico_categorias()

    return jsonify(categorias), 200

@grafic.route("/grafico_favoritos",methods=["GET"])
def grafico_favoritos():

    resultado = GraficsService.grafico_favoritos()

    return jsonify(resultado), 200


@grafic.route("/grafico_favoritos_categoria",methods=["GET"])
def grafico_favoritos_categoria():

    resultado = GraficsService.grafico_favoritos_categoria()

    return jsonify(resultado), 200


@grafic.route("/grafico_municipios",methods=["GET"])
def grafico_municipios():

    resultado = GraficsService.grafico_municipios()

    return jsonify(resultado), 200



@grafic.route("/grafico_top_categorias",methods=["GET"])
def grafico_top_categorias():

    resultado = GraficsService.grafico_top_categorias()

    return jsonify(resultado), 200

