from flask import Flask, abort, request
from flask_cors import CORS
from app.config import configure_app
from app.database import db, init_db
from app.routes.auth.routes import init_routes
from app.routes.qout.routes_travas import init_routes_trava

from app.routes.qout.routes_broker import init_routes_broker
from app.auth import jwt
from app.routes.rotas.acessos.routes_acessos import init_routes_acessos
from app.routes.rotas.empresas.routes_empresa import init_routes_empresa
from app.routes.rotas.grupos.routes_grupo import init_routes_grupo
from app.routes.rotas.imagens.routes_imagem import init_routes_imagem
from app.routes.rotas.parceiros.routes_parceiro import init_routes_parceiro
from app.routes.rotas.routes_firebase import init_routes_firebase
from app.routes.rotas.usuarios.routes_usuario import init_routes_usuario 

def create_app():
    
    app = Flask(__name__) 
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    # Lista de IPs permitidos
    ALLOWED_IPS = ['170.233.27.42', '170.233.27.42']

    @app.before_request
    def limit_remote_addr():
        if request.remote_addr not in ALLOWED_IPS:
            print(request.remote_addr)
            abort(403)

    configure_app(app)
    db.init_app(app)
    jwt.init_app(app)
    
    with app.app_context():
        init_db(app)

    init_routes(app)
    init_routes_empresa(app)
    init_routes_grupo(app)
    init_routes_parceiro(app)
    init_routes_usuario(app)
    init_routes_acessos(app)
    init_routes_broker(app)
    init_routes_trava(app)
    init_routes_firebase(app)
    init_routes_imagem(app)
    
    return app

app = create_app()