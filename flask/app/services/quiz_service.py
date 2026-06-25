from app.extensions import db, text, bindparam
from app.models.persona import Persona
from app.models.user import User
from app.models.quizuser import QuizUser
import uuid
from collections import defaultdict

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
                c.id AS id_categoria,
                SUM(a.pontos) AS pontos
            FROM turismes.alternativas a
            JOIN turismes.categoria c
                ON c.id = a.categoria_id
            WHERE a.id IN :ids
            GROUP BY c.nome, c.id
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
    

    



    # Alterar a tabela de preferencia do usuário 
    # pois não tem nda que define todos os quizes que o usuário vai fez
    
    @staticmethod
    def salvar_historico(usuario_id, resultado):
        registros = []
        quiz_id = str(uuid.uuid4())

        for i in resultado:
            new_preference_user = QuizUser()

            new_preference_user.usuario_id = usuario_id
            new_preference_user.quiz_id = quiz_id
            new_preference_user.categoria_id = i["id_categoria"]
            new_preference_user.pontuacao = i["pontos"]

            db.session.add(new_preference_user)
            registros.append(new_preference_user)

        db.session.commit()
        return registros
    


    
    @staticmethod
    def apagar_historico(quiz_id):

        registros = QuizUser.query.filter_by(
            quiz_id=quiz_id
        ).all()

        if not registros:
            return False

        for registro in registros:
            db.session.delete(registro)

        db.session.commit()

        return True
    


    @staticmethod
    def buscar_historico_user(usuario_id):

        registros = (
            QuizUser.query
            .filter_by(usuario_id=usuario_id)
            .order_by(QuizUser.data_realizacao.desc())
            .all()
        )

        quizzes = {}

        for registro in registros:

            quiz_id = registro.quiz_id

            if quiz_id not in quizzes:
                quizzes[quiz_id] = {
                    "quiz_id": quiz_id,
                    "data_realizacao": registro.data_realizacao.isoformat(),
                    "pontuacao_total": 0,
                    "categorias": []
                }

            quizzes[quiz_id]["pontuacao_total"] += registro.pontuacao

            quizzes[quiz_id]["categorias"].append({
                "categoria_id": registro.categoria_id,
                "categoria_nome": registro.categoria.nome,
                "pontuacao": registro.pontuacao
            })

        return list(quizzes.values())