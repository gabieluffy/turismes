from app.models.place import Place
from app.extensions import db, text


class RecommendationService:

    @staticmethod
    def get_recommendations(user):

        places = Place.query.all()

        recommendations = []

        for place in places:

            score = 0

            # Categoria praia
            if (
                hasattr(user, "likes_beach")
                and user.likes_beach
                and place.category == "Praia"
            ):
                score += 10

            # Categoria montanha
            if (
                hasattr(user, "likes_mountains")
                and user.likes_mountains
                and place.category == "Montanha"
            ):
                score += 10

            # Tags aventura
            if (
                place.tags
                and "aventura" in place.tags.lower()
            ):
                score += 5

            # Avaliação alta
            if place.average_rating >= 4.5:
                score += 4

            recommendations.append({
                "place": place,
                "score": score
            })

        recommendations.sort(
            key=lambda item: item["score"],
            reverse=True
        )

        return recommendations[:10]
    
    @staticmethod
    def grafico():
        """ 
        ## Dados para gráfico
        Esse gráfico mostra o total de recomendaçõees feitas pós quiz para a persona
        """
        
        resultado = db.session.execute(
            text("""
            SELECT 
                categoria."name" AS categoria, 
                COUNT(place.id) AS recomendacao
            FROM categoria 
            INNER JOIN place   
                ON categoria.id_palce = place.id
            GROUP BY categoria.name;
            """)
        ).mappings()

        return [dict(row) for row in resultado]
