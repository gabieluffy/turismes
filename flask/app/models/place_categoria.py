from app.extensions import db

class PlaceCategoria(db.Model):
    __tablename__ = "place_categoria"

    place_id = db.Column(
        "place_id",
        db.Integer,
        db.ForeignKey("place.id"),
        primary_key=True
    )
    categoria_id = db.Column(
        "categoria_id",
        db.Integer,
        db.ForeignKey("categoria.id"),
        primary_key=True
    )


