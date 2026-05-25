from app.extensions import db
from app.models.avaliacao import Avaliacao

class AvaliacoesService():
    @staticmethod
    def criar_avalicao(newavaliacao):
        db.session.add(newavaliacao)
        db.session.commit()

        return newavaliacao

    @staticmethod
    def verifica(id_user, id_place):

        ja_avaliou = Avaliacao.query.filter_by(
            id_user=id_user,
            id_place=id_place
        ).first()

        return ja_avaliou is None