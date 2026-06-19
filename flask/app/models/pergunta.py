from app.extensions import db

class Pergunta(db.Model):
    __tablename__ = "perguntas"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    titulo = db.Column(db.Text)
    
    def to_dic(self):
        return {
            "id": self.id,
            "titulo": self.titulo
        }