from app.extensions import db

class Categoria(db.Model):
    __tablename__ = "categoria"
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(50), nullable=False)

    id_palce = db.Column(
        db.Integer,
        db.ForeignKey("place.id"),
        nullable=False
    )

    palce = db.relationship("Place", backref="categoria")

