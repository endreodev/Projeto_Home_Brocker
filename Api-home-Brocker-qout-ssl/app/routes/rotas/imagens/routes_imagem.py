from flask import jsonify, request, abort
from flask_jwt_extended import jwt_required, get_jwt 
from numpy import empty
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename
from app.database import db
from app.models.models import Acessos, Empresa, User
from app.models.validacao import valideUserInterno


def init_routes_imagem(app): 
    @app.route('/upload_logo', methods=['POST'])
    @jwt_required()
    def upload_logo():

        additional_claims = get_jwt()
        user_id = additional_claims.get('user_id', None)

        if not valideUserInterno(user_id):
            return jsonify({'message': 'Usuario sem acesso a rotina'}), 400
        
        # if 'logo' not in request.files:
        #     return jsonify({'message': 'Nenhuma imagem encontrada'}), 400
        
        # file = request.files['logo']
        # if file.filename == '':
        #     return jsonify({'message': 'Nenhum arquivo selecionado'}), 400

        # if file:
        #     filename = secure_filename(file.filename)
        #     filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        #     file.save(filepath)

        #     additional_claims = get_jwt()
        #     user_id = additional_claims.get('user_id', None)
        #     empresa_id = additional_claims.get('empresa_id', None)

        #     # Atualiza o caminho do logo no banco de dados
        #     try:
        #         empresa = Empresa.query.get(empresa_id)
        #         if not empresa:
        #             return jsonify({'message': 'Empresa não encontrada'}), 404
                
        #         empresa.logo_path = filepath
        #         db.session.commit()
                
        #         return jsonify({'message': 'Logo enviado e salvo com sucesso'}), 200
            
        #     except SQLAlchemyError as e:
        #         db.session.rollback()
        #         return jsonify({'message': 'Erro ao salvar no banco de dados', 'error': str(e)}), 500



