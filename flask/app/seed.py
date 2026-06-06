from app.extensions import db, bcrypt
from app.models.user import User
from app.models.place import Place
from app.models.categoria import Categoria

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
            image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEGHqfExlia7pL1B8gtZUOa6126IMu_daA9A&s",
            latitude=-20.3945515,
            longitude=-41.0296021,
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
            image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWcfFCN-pahK8zD6z6dEs3lUv-WduqZLd9dg&s",
            latitude=-20.7389986,
            longitude=-40.5414741,
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
            image_url="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFzuDkpDPkKAkEjMjMBG45K5Jk-7_4VE6zP_dDGSMMpA9scKbtuQanB1yiYZtB4L9HZBpzih97GKb1f5f4XiBjZVuMmsDPB_US0IXxhfXNQKvIaLBsNYmSroCXJXQBkl17kalxM5w=w270-h312-n-k-no",
            latitude=-20.3293623,
            longitude=-40.2896439,
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
            image_url="https://www.gov.br/ana/pt-br/imagens/imagens-das-regioes-hidrograficas/regiao-hidrografica-atlantico-sudeste/atsd_027-d-es0720-floresta-atlantica-do-parque-estadual-de-itaunas-es-zig-koch.png",
            latitude=-18.4177587,
            longitude=-39.7104491,
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
            latitude=-20.4019496,
            longitude=-41.0369255,
            average_rating=4.8,
            tags="gastronomia,montanha,casal,frio",
            featured=True
        )]


    for place in places:
        db.session.add(place)

    db.session.commit()

    print("Places cadastrados!")


    categorias = [
        Categoria('Natureza', 1),
        Categoria('Praia', 2),
        Categoria('História', 3),
        Categoria('Ecoturismo', 4),
        Categoria('Gastronomia', 5),
        Categoria('Natureza', 4)
    ]


    for categoria in categorias:
        db.session.add(categoria)

    db.session.commit()
    