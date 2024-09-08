from flask import Flask, abort, request
from flask_cors import CORS
from app.config import configure_app
import geoip2.database
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
import subprocess
from datetime import datetime
import pytz


db_path = 'GeoLite2-Country.mmdb'

# # Função para obter o código do país de um IP
def get_country_code(ip_address):
    with geoip2.database.Reader(db_path) as reader:
        response = reader.country(ip_address)
        return response.country.iso_code

# Função para verificar se o IP é do Brasil
def is_ip_from_brazil(ip_address):
    country_code = get_country_code(ip_address)
    return country_code == 'BR'

def create_app():
    
    app = Flask(__name__) 
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Lista de IPs permitidos
    # ALLOWED_IPS = ['170.233.27.42', '170.233.27.42']
    # DENED_IPS = ['199.45.154.131', '77.90.42.3','77.90.42.3','34.22.135.234']
    pytz.timezone('America/Sao_Paulo')

    @app.errorhandler(403)
    @app.errorhandler(404)
    @app.errorhandler(505)
    def handle_404_error(error):
        ip_address = request.remote_addr  # Captura o IP do solicitante
        if "170.233.27.42" != ip_address:
            # block_ip(ip_address)
            print(f"ip realizando requisicao {ip_address}")
            return f"ip capturado {ip_address}" #f"Error {error.code}: {error.description}", error.code

    def block_ip(ip):
        # Chama o script PowerShell com o IP para bloquear
        print("Adicionou no firewaal {} ".format(ip))
        subprocess.run(["powershell.exe", "-File", "Credenciais.ps1", f"-ipToBlock {ip}"], capture_output=True)

    @app.before_request
    def limit_remote_addr():
        if not is_ip_from_brazil(request.remote_addr):
            block_ip(request.remote_addr)
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