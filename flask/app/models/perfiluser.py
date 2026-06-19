from app.extensions import db

class UserPreference(db.Model):
    __tablename__ = "user_preference"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    categoria_id = db.Column(db.Integer, db.ForeignKey("categoria.id"))
    pontuacao = db.Column(db.Integer, nullable=False)

    # Relacionamento com a tabela User
    usuario = db.relationship("User", backref="user_preference")
    categoria = db.relationship("Categoria", backref="user_preference")