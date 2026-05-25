from ..extensions import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def to_dict(self):

        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "password": self.password
        }