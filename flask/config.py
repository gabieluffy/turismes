import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")            
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
    #SQLALCHEMY_DATABASE_URI = "sqlite:///users.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ConfigTeste:
    SQLALCHEMY_DATABASE_URI_TESTE = os.getenv("DATABASE_URL_TESTE")            