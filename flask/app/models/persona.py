from app.extensions import db

class Persona(db.Model):
    __tablename__ = "persona"
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100))

    likes_beach = db.Column(db.Boolean)

    likes_mountains = db.Column(db.Boolean)

    likes_food = db.Column(db.Boolean)

    likes_history = db.Column(db.Boolean)

    likes_nature = db.Column(db.Boolean)

    persona_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id")
    )

    user = db.relationship("User", backref="persona")
    