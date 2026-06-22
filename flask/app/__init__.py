from flask import Flask
from .extensions import db, login_manager, bcrypt, jwt, cors
import os
from .models.user import User
from .models.place import Place
from .models.avaliacao import Avaliacao
from .models.categoria import Categoria
from .models.cidade import Cidade
from .models.favorito import Favorito
from app.models.alternativa import Alternativa
from app.models.pergunta import Pergunta
from app.models.place_categoria import PlaceCategoria
from app.models.perfiluser import UserPreference
from app.routes.auth_routes import main
from app.routes.grafics_routes import grafic
from app.routes.quiz_routes import quiz
from app.routes.recommendation_routes import recommendation_bp
from config import Config, ConfigTeste
from .seed import seed_database
from sqlalchemy.exc import OperationalError


def create_app(testing=False):
    app = Flask(__name__)
    app.config.from_object(Config)
    
    if testing:
        app.config.from_object(ConfigTeste)
    
    
    cors(app)
    
    db.init_app(app)
    login_manager.init_app(app)
    
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY", "sua-chave-super-secreta")
    jwt.init_app(app)
    
    bcrypt.init_app(app)

    app.register_blueprint(main)
    app.register_blueprint(grafic)
    app.register_blueprint(quiz)
    app.register_blueprint(recommendation_bp)

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
    print("CONFIGURAÇÃO MINHA: ", app.config["SQLALCHEMY_DATABASE_URI"])
    return app