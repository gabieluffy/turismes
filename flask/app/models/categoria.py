from app.extensions import db

class Categoria(db.Model):
    __tablename__ = "categoria"
    id = db.Column(db.Integer, primary_key=True)

    nome = db.Column(db.String(50), nullable=False)
    codigo = db.Column(db.String(100))
    icone = db.Column(db.String(100))
    cor = db.Column(db.String(50))
    descricao = db.Column(db.Text)

    def to_dict(self):
        return {
            "nome": self.nome,
            "codeigo": self.codigo,
            "icone": self.icone,
            "cor": self.cor,
            "descricao": self.descricao
        }
