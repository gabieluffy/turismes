from app.extensions import db

class Alternativa(db.Model):
    __tablename__ = "alternativas"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pergunta_id = db.Column(db.Integer, db.ForeignKey("perguntas.id"))
    texto = db.Column(db.Text)
    categoria_id = db.Column(db.Integer, db.ForeignKey("categoria.id"))
    pontos = db.Column(db.Integer)
    
    pergunta = db.relationship("Pergunta", backref="alternativas")
    categoria = db.relationship("Categoria", backref="alternativas")

    def to_dic(self):
        return {
            "id": self.id,
            "pergunta_id": self.pergunta_id,
            "texto": self.texto,
            "categoria_id": self.categoria_id,
            "pontos": self.pontos
        }
    

