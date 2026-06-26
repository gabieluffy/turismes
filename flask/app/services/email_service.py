from flask_mail import Message
from app.extensions import mail
from config import Config


class EmailService:

    @staticmethod
    def enviar_recuperacao(email, token):

        hostfront = Config.HOST_FRONT

        link = f"{hostfront}/esqueci-senha?token={token}"

        corpo = f"""
Olá!

Recebemos uma solicitação para redefinir sua senha.

Clique no link abaixo:

{link}

Este link expira em 15 minutos.

Caso você não tenha solicitado a recuperação de senha,
ignore este e-mail.

Equipe TurismES.
"""

        msg = Message(
            subject="Recuperação de senha - TurismES",
            recipients=[email],
            body=corpo
        )

        mail.send(msg)