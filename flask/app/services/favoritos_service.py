from app.extensions import db
from app.models.favorito import Favorito

class FavoritoService():
    
    @staticmethod
    def criar_favorito(favorito: Favorito):

        db.session.add(favorito)
        db.session.commit()

        return True
    
    @staticmethod
    def excluir_favorito(id_favorito: int):

        exfavorito: Favorito = Favorito.query.get(id_favorito)

        if not exfavorito:
            return False

        db.session.delete(exfavorito)
        db.session.commit()

        return True
    
    @staticmethod
    def remover_favorito(id_user, id_place):

        favorito = Favorito.query.filter_by(
            id_user=id_user,
            id_place=id_place
        ).first()

        if not favorito:
            return False

        db.session.delete(favorito)
        db.session.commit()

        return True

    @staticmethod
    def lista_favoritos():
        return Favorito.query.all()