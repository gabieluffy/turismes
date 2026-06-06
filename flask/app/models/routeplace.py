from app.extensions import db

class RoutePlace(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    route_id = db.Column(
        db.Integer,
        db.ForeignKey("route.id")
    )

    place_id = db.Column(
        db.Integer,
        db.ForeignKey("place.id")
    )

    order = db.Column(db.Integer)

    arrival_time = db.Column(db.Time)