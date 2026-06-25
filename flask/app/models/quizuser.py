import uuid
from app.extensions import db

class QuizUser(db.Model):
    __tablename__ = "quiz_resultado"
        
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    data_realizacao = db.Column(
        db.TIMESTAMP,
        nullable=False,
        server_default=db.func.now()
    )
    quiz_id = db.Column(
        db.String(36),
        nullable=False
    )
    categoria_id = db.Column(db.Integer, db.ForeignKey("categoria.id"))
    pontuacao = db.Column(db.Integer, nullable=False)

    # Relacionamento com a tabela User
    usuario = db.relationship("User", backref="quiz_resultado")
    categoria = db.relationship("Categoria", backref="quiz_resultado")

    def to_dict(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "data_realizacao": self.data_realizacao,
            "categoria_id": self.categoria_id,
            "pontuacao": self.pontuacao
        }