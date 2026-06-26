from app.extensions import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    telefone = db.Column(db.String(20))
    cidade = db.Column(db.String(100))
    bio = db.Column(db.TEXT)

    reset_token = db.Column(db.String(100), nullable=True)
    reset_token_expiration = db.Column(
        db.DateTime(timezone=True),
        nullable=True
    )

    def to_dict(self):

        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "telefone": self.telefone,
            "cidade": self.cidade,
            "bio": self.bio
        }