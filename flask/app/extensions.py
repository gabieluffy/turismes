from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from sqlalchemy import text, bindparam

jwt = JWTManager()
db = SQLAlchemy()
login_manager = LoginManager()
bcrypt = Bcrypt()
cors = CORS

#login_manager.login_view = "login"
login_manager.login_view = "main.login"