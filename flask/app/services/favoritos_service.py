from app.extensions import db
from app.models.favorito import Favorito

class FavoritoService():
    
    @staticmethod
    def criar_favorito(favorito):

        db.session.add(favorito)
        db.session.commit()

        return favorito
    
    @staticmethod
    def excluir_favorito(id_favorito):

        exfavorito = Favorito.query.get(id_favorito)

        if not exfavorito:
            return False

        db.session.delete(exfavorito)
        db.session.commit()

        return True

    @staticmethod
    def lista_favoritos():
        return Favorito.query.all()