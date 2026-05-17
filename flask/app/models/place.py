from app.extensions import db

class Place(db.Model):
    __tablename__ = "place"
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(200), nullable=False)

    city = db.Column(db.String(100), nullable=False)

    region = db.Column(db.String(100))

    category = db.Column(db.String(100))

    description = db.Column(db.Text)

    image_url = db.Column(db.String(500))

    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    average_rating = db.Column(db.Float, default=0)

    tags = db.Column(db.String(500))

    featured = db.Column(db.Boolean, default=False)