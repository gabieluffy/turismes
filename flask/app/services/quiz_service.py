from app.extensions import db, text, bindparam
from app.models.persona import Persona

class QuizService:
    @staticmethod
    def atualizar_persona(usuario_id, resultado):

        persona = Persona.query.filter_by(
            user_id=usuario_id
        ).first()

        if not persona:
            persona = Persona(user_id=usuario_id)
            db.session.add(persona)

        # Zera tudo
        persona.likes_beach = False
        persona.likes_mountains = False
        persona.likes_food = False
        persona.likes_history = False
        persona.likes_nature = False

        if not resultado:
            return

        maior = resultado[0]["pontos"]

        limite = maior * 0.8

        for item in resultado:

            if item["pontos"] < limite:
                continue
            categoria = item["categoria"].lower()
            print("PROCURANDO MAIOR ", categoria)

            if categoria == "praia":
                persona.likes_beach = True

            elif categoria == "montanha":
                persona.likes_mountains = True

            elif categoria == "gastronomia":
                persona.likes_food = True

            elif categoria == "historia":
                persona.likes_history = True

            elif categoria == "ecoturismo":
                persona.likes_nature = True

        db.session.commit()







    # Respostas
    @staticmethod
    def calcular_resultado(respostas):

        query = text("""
            SELECT
                c.nome AS categoria,
                SUM(a.pontos) AS pontos
            FROM turismes.alternativas a
            JOIN turismes.categoria c
                ON c.id = a.categoria_id
            WHERE a.id IN :ids
            GROUP BY c.nome
            ORDER BY pontos DESC
        """).bindparams(
            bindparam("ids", expanding=True)
        )

        resultado = db.session.execute(
            query,
            {"ids": respostas}
        ).mappings()

        return [dict(row) for row in resultado]
    






    # Perguntas
    @staticmethod
    def listar_perguntas():
        resultado = db.session.execute(
            text("""
                SELECT
                    p.id AS pergunta_id,
                    p.titulo,
                    a.id AS alternativa_id,
                    a.texto
                FROM turismes.perguntas p
                JOIN turismes.alternativas a
                    ON a.pergunta_id = p.id
                ORDER BY p.id, a.id
            """)
        ).mappings()

        perguntas = {}

        for row in resultado:

            pid = row["pergunta_id"]

            if pid not in perguntas:
                perguntas[pid] = {
                    "id": pid,
                    "titulo": row["titulo"],
                    "alternativas": []
                }

            perguntas[pid]["alternativas"].append({
                "id": row["alternativa_id"],
                "texto": row["texto"]
            })

        return list(perguntas.values())
    

    