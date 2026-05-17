from app.extensions import db

class Favorito(db.Model):
    __tablename__= "favorito"
    id = db.Column(db.Integer, primary_key=True)

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
    
    user = db.relationship("User", backref="favorito")
    place = db.relationship("Place", backref="favorito")