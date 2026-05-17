from app.extensions import db

class Avaliacao(db.Model):
    __tablename__ = "avaliacao"
    id = db.Column(db.Integer, primary_key=True)
    
    comentario = db.Column(db.String(255))
    
    nota = db.Column(db.Integer)

    id_user = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    id_place = db.Column(
        db.Integer,
        db.ForeignKey("place.id"),
        nullable=False
    )


    user = db.relationship("User", backref="avaliacao")
    place = db.relationship("Place", backref="avaliacao")
