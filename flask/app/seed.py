from app.extensions import db, bcrypt
from app.models.user import User
from app.models.place import Place

def seed_database():

    existing_user = User.query.first()
    existe_palces = Place.query.first()

    if existing_user:
        print("Seed já executada.")
        return
    
    if existe_palces:
        print("Seed places já executada.")
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


    places = [

        Place(
            name="Pedra Azul",
            city="Domingos Martins",
            region="Montanhas Capixabas",
            category="Natureza",
            description="Destino famoso pelas montanhas, clima frio e natureza exuberante.",
            image_url="https://upload.wikimedia.org/wikipedia/commons/0/0f/Pedra_Azul.jpg",
            latitude=-20.416,
            longitude=-41.008,
            average_rating=4.9,
            tags="montanha,natureza,trilha,casal,frio",
            featured=True
        ),

        Place(
            name="Praia de Meaípe",
            city="Guarapari",
            region="Metropolitana",
            category="Praia",
            description="Praia famosa pela culinária capixaba e águas calmas.",
            image_url="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/8f/7d/5e/praia-de-meaipe.jpg",
            latitude=-20.739,
            longitude=-40.533,
            average_rating=4.7,
            tags="praia,gastronomia,familia,verao",
            featured=True
        ),

        Place(
            name="Convento da Penha",
            city="Vila Velha",
            region="Metropolitana",
            category="História",
            description="Patrimônio histórico e religioso com vista panorâmica.",
            image_url="https://upload.wikimedia.org/wikipedia/commons/9/98/Convento_da_Penha.jpg",
            latitude=-20.341,
            longitude=-40.287,
            average_rating=4.9,
            tags="historia,religioso,mirante,familia",
            featured=True
        ),

        Place(
            name="Parque Estadual de Itaúnas",
            city="Conceição da Barra",
            region="Verde e das Águas",
            category="Ecoturismo",
            description="Conhecido pelas dunas e pelo forró tradicional.",
            image_url="https://upload.wikimedia.org/wikipedia/commons/e/e1/Itaunas.jpg",
            latitude=-18.417,
            longitude=-39.700,
            average_rating=4.8,
            tags="dunas,praia,forro,aventura,natureza",
            featured=True
        ),

        Place(
            name="Rota do Lagarto",
            city="Domingos Martins",
            region="Montanhas Capixabas",
            category="Gastronomia",
            description="Rota turística com restaurantes e paisagens incríveis.",
            image_url="https://upload.wikimedia.org/wikipedia/commons/7/72/Rota_do_Lagarto.jpg",
            latitude=-20.401,
            longitude=-41.011,
            average_rating=4.8,
            tags="gastronomia,montanha,casal,frio",
            featured=True
        )]


    for place in places:
        db.session.add(place)

    db.session.commit()

    print("Places cadastrados!")