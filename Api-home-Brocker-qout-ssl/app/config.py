from urllib.parse import quote_plus


def configure_app(app):
   # Codificar a senha utilizando quote_plus
   password = quote_plus('Jaca@157Maconha')

   # Montar o URI com a senha codificada
   app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:{password}@localhost/homebroker'
   app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
   app.config['JWT_SECRET_KEY'] = 'homebrokerFNX@2024'
   app.config['CORS_HEADERS'] = 'Content-Type'

   # Configuração do caminho onde as imagens serão salvas
   UPLOAD_FOLDER = 'app/upload/'
   app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER