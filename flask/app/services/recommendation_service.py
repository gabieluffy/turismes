from app.models.place import Place
from app.models.persona import Persona
from datetime import datetime, timedelta
from haversine import haversine
from app.models.route import Route
from app.extensions import db, text


class RecommendationService:

    def calculate_score(persona, place):
        """
        ## Calcular Score  
        Calculo de score de lugar para a persona  
        >As categorias para persona são booleans  
        * gosta de praia + 10 pts
        * o lugar tem praia + 10 pts
        * a classificação está acima da média + 5 pts 
        """
        score = 0
            
        if persona.likes_beach:
            score += 10

        if place.category == "Praia":
            score += 10

        if place.average_rating >= 4.5:
            score += 5
        return score

    def calculate_distance(lat1, lon1, lat2, lon2):
        """
        ## Calcular a distância enter duas coordenadas geograficas
        """
        
        dist = haversine((lat1, lon1), (lat2, lon2))

        return dist
    
    def apply_distance_bonus(score, dist):

        if dist < 5:
            score += 30

        elif dist < 20:
            score += 15

        elif dist < 50:
            score += 5

        return score

    
    @staticmethod
    def get_icon(place):

        category = (place.category or "").lower()

        if "praia" in category:
            return "beach_access"

        if "igreja" in category:
            return "church"

        if "restaurante" in category:
            return "restaurant"

        if "parque" in category:
            return "park"

        if "montanha" in category:
            return "terrain"

        return "place"

    @staticmethod
    def generate_route(persona, user_lon: float, user_lat: float):
        """ # Gerar roteiro Essa função constroi rotas para a persona solicitante  
        ## Algoritmo: 
        * Buscar todos os locais. 
        * Pontuar os gostos da persona. 
        * Calcular distância. 
        * Adicionar peso da distância. 
        * Selecionar os melhores. 
        * Ordenar para visita (Começando na localização atual). 
        """
        places = Place.query.all()

        candidates = []

        # Seleciona e pontua candidatos
        for place in places:

            score = RecommendationService.calculate_score(
                persona,
                place
            )

            distance = RecommendationService.calculate_distance(
                user_lat,
                user_lon,
                place.latitude,
                place.longitude
            )

            score = RecommendationService.apply_distance_bonus(
                score=score,
                dist=distance
            )

            candidates.append({
                "place": place,
                "score": score,
                "distance": distance
            })

        # Top lugares pela persona
        top_places = sorted(
            candidates,
            key=lambda x: x["score"],
            reverse=True
        )[:20]

        remaining_places = top_places.copy()

        current_lat = user_lat
        current_lon = user_lon

        route = []

        # Ordenação Nearest Neighbor
        while remaining_places:

            nearest_entry = min(
                remaining_places,
                key=lambda item: RecommendationService.calculate_distance(
                    current_lat,
                    current_lon,
                    item["place"].latitude,
                    item["place"].longitude
                )
            )

            route.append(nearest_entry)

            current_lat = nearest_entry["place"].latitude
            current_lon = nearest_entry["place"].longitude

            remaining_places.remove(nearest_entry)

        # Montar resposta para frontend
        response = []

        current_time = datetime.now()

        for i, item in enumerate(route):

            place = item["place"]

            # Próxima parada
            next_info = None

            if i < len(route) - 1:

                next_place = route[i + 1]["place"]

                next_distance = RecommendationService.calculate_distance(
                    place.latitude,
                    place.longitude,
                    next_place.latitude,
                    next_place.longitude
                )

                # velocidade média simulada
                estimated_minutes = round((next_distance / 40) * 60)

                next_info = (
                    f"{estimated_minutes} min até a próxima parada "
                    f"({next_distance:.1f} km)"
                )

            response.append({
                "time": current_time.strftime("%H:%M"),
                "badge": f"Parada {i + 1:02}",
                "icon": RecommendationService.get_icon(place),
                "title": place.name,
                "desc": place.description,
                "next": next_info,
                "img": place.image_url
            })

            # tempo estimado de visita
            current_time += timedelta(hours=2)

        return response

    @staticmethod
    def get_recommendations(user):
            """
            ## Lógica de recomendação de persona
            Essa função tras lugares recomendados usando a localização e as caracteeristicas da persona  
            `user`: o usuário  
            `local`: a localização para o planejamento
            """

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
