from app.extensions import db

class Place(db.Model):
    __tablename__ = "place"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    name = db.Column(db.String(200), nullable=False)

    city = db.Column(db.String(100), nullable=False)

    region = db.Column(db.String(100))

    description = db.Column(db.Text)

    image_url = db.Column(db.String(500))

    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    average_rating = db.Column(db.Float, default=0)
    
    estimated_visit_minutes = db.Column(
        db.Integer,
        default=60
    )

    tags = db.Column(db.String(500))

    featured = db.Column(db.Boolean, default=False)

    cidade_id = db.Column(db.Integer, db.ForeignKey("cidade.id"))

    cidade = db.relationship("Cidade", backref="place")
    
    categorias = db.relationship(
        "Categoria",
        secondary="place_categoria",
        lazy="joined"
    )

    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "city": self.city,
            "region": self.region,
            "description": self.description,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "image_url": self.image_url,
            "average_rating": self.average_rating,
            "tags": self.tags,
            "featured": self.featured,
            "cidade_id": self.cidade_id
        }