from app.extensions import db

class UserPreference(db.Model):
    __tablename__ = "userpreference"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer)

    likes_beach = db.Column(db.Boolean)
    likes_mountains = db.Column(db.Boolean)
    likes_food = db.Column(db.Boolean)
    likes_history = db.Column(db.Boolean)