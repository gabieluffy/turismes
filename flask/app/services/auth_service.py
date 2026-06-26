from app.extensions import db
from app.models.user import User
import secrets
from datetime import datetime, timedelta, UTC
from app.services.email_service import EmailService
from app.extensions import bcrypt

class UserService:

    @staticmethod
    def editar_usuario(id_usuario, username, email, telefone, cidade, bio):

        usuario = User.query.get(id_usuario)

        if not usuario:
            return None

        usuario.username = username
        usuario.email = email
        usuario.telefone = telefone
        usuario.cidade = cidade
        usuario.bio = bio

        db.session.commit()

        return usuario
    
    @staticmethod
    def gerar_token_recuperacao(email):

        usuario = User.query.filter_by(email=email).first()

        # Não revela se o e-mail existe
        if not usuario:
            return True

        token = secrets.token_urlsafe(32)

        usuario.reset_token = token
        usuario.reset_token_expiration = datetime.now(UTC) + timedelta(minutes=15)

        db.session.commit()

        EmailService.enviar_recuperacao(
            usuario.email,
            token
        )

        return True
    

    @staticmethod
    def validar_token(token_recebido):

        usuario = User.query.filter_by(
            reset_token=token_recebido
        ).first()

        if usuario is None:
            return None

        if usuario.reset_token_expiration is None:
            return None

        if (
            usuario.reset_token is None or
            usuario.reset_token_expiration is None
        ):
            return None

        return usuario


    @staticmethod
    def redefinir_senha(token_recebido, nova_senha):

        usuario = UserService.validar_token(token_recebido)

        if usuario is None:
            return False

        usuario.password = bcrypt.generate_password_hash(
            nova_senha
        ).decode("utf-8")

        # Invalida o token após o uso
        usuario.reset_token = None
        usuario.reset_token_expiration = None

        db.session.commit()

        return True