from app.extensions import db, text

class GraficsService:
    '''@staticmethod
    def grafico():
            """ 
            ## Dados para gráfico
            Esse gráfico mostra o total de recomendaçõees feitas pós quiz para a persona
            """
            
            resultado = db.session.execute(
                text("""
                SELECT 
                    c.nome AS categoria, 
                    COUNT(p.id) AS recomendacao
                FROM categoria c 
                INNER JOIN place_categoria pc    
                    ON c.id = pc.categoria_id 
                INNER JOIN place p    
                    ON p.id = pc.place_id  
                GROUP BY c.nome ;
                """)
            ).mappings()

            return [dict(row) for row in resultado]'''
    
    @staticmethod
    def grafico_categorias():
        resultado = db.session.execute(
            text("""
            SELECT
                c.nome AS categoria,
                COUNT(p.id) AS quantidade
            FROM categoria c
            INNER JOIN place_categoria pc
                ON c.id = pc.categoria_id
            INNER JOIN place p
                ON p.id = pc.place_id
            GROUP BY c.nome
            ORDER BY quantidade DESC;
            """)
        ).mappings()

        return [dict(row) for row in resultado]
    
    @staticmethod
    def grafico_favoritos():
        resultado = db.session.execute(
            text("""
                SELECT
                    p."name" AS nome,
                    COUNT(f.id) AS favoritos
                FROM favorito f
                INNER JOIN place p
                    ON p.id = f.id_place 
                GROUP BY p."name" 
                ORDER BY favoritos DESC
                LIMIT 10;
            """)
        ).mappings()

        return [dict(row) for row in resultado]
    
    @staticmethod
    def grafico_favoritos_categoria():
        resultado = db.session.execute(
            text("""
            SELECT
                c.nome AS categoria,
                COUNT(f.id) AS favoritos
            FROM favorito f
            INNER JOIN place p
                ON p.id = f.id_place 
            INNER JOIN place_categoria pc
                ON p.id = pc.place_id
            INNER JOIN categoria c
                ON c.id = pc.categoria_id
            GROUP BY c.nome
            ORDER BY favoritos DESC;
            """)
        ).mappings()

        return [dict(row) for row in resultado]
        
    @staticmethod
    def grafico_municipios():
        resultado = db.session.execute(
            text("""
            SELECT
                p.city AS cidade,
                COUNT(*) AS locais
            FROM place p
            GROUP BY city 
            ORDER BY locais DESC;
            """)
        ).mappings()

        return [dict(row) for row in resultado]
        
    @staticmethod
    def grafico_top_categorias():
        resultado = db.session.execute(
            text("""
            SELECT
                c.nome,
                COUNT(pc.place_id) AS total
            FROM categoria c
            INNER JOIN place_categoria pc
                ON c.id = pc.categoria_id
            GROUP BY c.nome
            ORDER BY total DESC;
            """)
        ).mappings()

        return [dict(row) for row in resultado]