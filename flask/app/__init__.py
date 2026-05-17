from flask import Flask
from .extensions import db, login_manager, bcrypt, jwt, cors
import os
from .models.user import User
from .models.place import Place
from .models.avaliacao import Avaliacao
from .models.categoria import Categoria
from .models.cidade import Cidade
from .models.favorito import Favorito
from .routes.auth_routes import main
from config import Config
from .seed import seed_database
from sqlalchemy.exc import OperationalError


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    cors(app)
    
    db.init_app(app)
    login_manager.init_app(app)
    
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY", "sua-chave-super-secreta")
    jwt.init_app(app)
    
    bcrypt.init_app(app)

    app.register_blueprint(main)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    with app.app_context():
        try:
            db.create_all()

            seed_database()

            print("Banco conectado com sucesso!")

        except OperationalError as e:
            print("Erro ao conectar ao banco:")
            print(e)

    return app