# python -m pytest

from app import create_app
from app.services.grafics_services import GraficsService
from app.models.categoria import Categoria
from app.models.place import Place
from app.models.favorito import Favorito
from app.extensions import db






def test_grafico_categorias(app):
    
        resultado = GraficsService.grafico_categorias()

        assert isinstance(resultado, list)

        if resultado:
            assert "categoria" in resultado[0]
            assert "quantidade" in resultado[0]



def test_grafico_favoritos(app):
    
        resultado = GraficsService.grafico_favoritos()

        assert isinstance(resultado, list)

        if resultado:
            assert "nome" in resultado[0]
            assert "favoritos" in resultado[0]


def test_grafico_favoritos_categoria(app):
    
        resultado = GraficsService.grafico_favoritos_categoria()

        assert isinstance(resultado, list)

        if resultado:
            assert "categoria" in resultado[0]
            assert "favoritos" in resultado[0]


def test_grafico_municipios(app):
    
        resultado = GraficsService.grafico_municipios()

        assert isinstance(resultado, list)

        if resultado:
            assert "cidade" in resultado[0]
            assert "locais" in resultado[0]


def test_grafico_top_categorias(app):
    
        resultado = GraficsService.grafico_top_categorias()

        assert isinstance(resultado, list)

        if resultado:
            assert "nome" in resultado[0]
            assert "total" in resultado[0]


"""def test_grafico_favoritos_retorna_quantidade_correta(app):
    

        praia = Categoria(nome="PRAIA")
        db.session.add(praia)

        local = Place(
            name="Praia da Sereia",
            city="Vila Velha",
            cidade_id=3
        )

        db.session.add(local)
        db.session.flush()

        favorito1 = Favorito(id_place=local.id, id_user=1)
        favorito2 = Favorito(id_place=local.id, id_user=1)

        db.session.add_all([
            favorito1,
            favorito2
        ])

        db.session.commit()

        resultado = GraficsService.grafico_favoritos()

        assert resultado[0]["favoritos"] == 2"""