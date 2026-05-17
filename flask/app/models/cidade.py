from app.extensions import db

class Cidade(db.Model):
    __tablename__ = "cidade"
    id = db.Column(db.Integer, primary_key=True)

    cidade = db.Column(db.String(100), unique= True, nullable=False)

    id_palce = db.Column(
        db.Integer,
        db.ForeignKey("place.id"),
        nullable=False
    )

    palce = db.relationship("Place", backref="cidade")