from flask import Flask
from .extensions import db, login_manager, bcrypt
from .models import User
from .routes import main
from config import Config
from .seed import seed_database
from sqlalchemy.exc import OperationalError

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    try:
        db.init_app(app)
        with app.app_context():
            db.engine.connect()
            seed_database()

        print("Banco conectado com sucesso!")
    except OperationalError as e:
        print("Erro ao conectar ao banco:")
        print(e)

    login_manager.init_app(app)
    bcrypt.init_app(app)

    app.register_blueprint(main)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    return app