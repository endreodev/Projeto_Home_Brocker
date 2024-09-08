import os
from flask import jsonify, request, abort, send_file, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt 
from numpy import empty
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename
from app.database import db
from app.models.models import Acessos, Empresa, User
from app.models.validacao import valideUserInterno



def init_routes_imagem(app):

    @app.route('/uploads/<filename>')
    def get_image(filename):
        try:
            
            file_path = os.path.join("upload/", filename)

            # Verifica se o arquivo existe na pasta
            if os.path.exists(file_path):
                # return send_from_directory("upload/", filename)
                return send_file(file_path, mimetype='image/jpeg')
            else:
                # Retorna um erro 404 se o arquivo não for encontrado
                abort(404)
        except Exception as e:
            # Em caso de erro, pode retornar uma resposta genérica ou logar o erro
           return send_from_directory("upload/", filename)

    # @app.route('/uploads/<filename>', methods=['GET'])
    # def uploaded_file(filename):
    #     try:
    #         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    #         if os.path.exists(filepath):
    #             print(filepath)
    #             return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    #         else:
    #             abort(404, description="Arquivo não encontrado")
    #     except Exception as e:
    #         app.logger.error(f"Erro ao servir o arquivo: {e}")
    #         return "Erro interno no servidor", 500
        
    # Servindo arquivos estáticos
    @app.route('/uploads-img')
    @jwt_required()
    def uploaded_file_img(filename):
        additional_claims = get_jwt()
        empresa_id = additional_claims.get('empresa_id', None)
        empresa = Empresa.query.get(empresa_id)
        return send_from_directory(app.config['UPLOAD_FOLDER'], empresa.logomarca )

    @app.route('/upload_logo', methods=['POST'])
    @jwt_required()
    def upload_logo():
        additional_claims = get_jwt()
        user_id = additional_claims.get('user_id', None)

        if not valideUserInterno(user_id):
            return jsonify({'message': 'Usuário sem acesso à rotina'}), 400
        
        if 'file' not in request.files:
            return jsonify({'message': 'Nenhuma imagem encontrada'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'message': 'Nenhum arquivo selecionado'}), 400

        if file:
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            # Atualiza o caminho do logo no banco de dados
            try:
                empresa = Empresa.query.get(additional_claims.get('empresa_id', None))
                if not empresa:
                    return jsonify({'message': 'Empresa não encontrada'}), 404
                
                empresa.logomarca = filename
                db.session.commit()

                # Gera a URL para acessar a imagem
                image_url = request.host_url + 'uploads/' + filename
                return jsonify({'message': 'Logo enviado e salvo com sucesso', 'image_url': image_url}), 200
            
            except SQLAlchemyError as e:
                db.session.rollback()
                return jsonify({'message': 'Erro ao salvar no banco de dados', 'error': str(e)}), 500
