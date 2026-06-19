from app.extensions import db, bcrypt
from app.models.user import User
from app.models.place import Place
from app.models.categoria import Categoria

def seed_database():

    existing_user = User.query.first()

    if existing_user:
        print("Seed já executada.")
        return

    print("Executando seed inicial...")

    password_hash = bcrypt.generate_password_hash(
        "123456"
    ).decode("utf-8")

    admin = User(
        username="admin",
        email="admin@email.com",
        password=password_hash
    )

    db.session.add(admin)

    db.session.commit()

    print("Usuário admin criado com sucesso!")

    db.session.commit()
    