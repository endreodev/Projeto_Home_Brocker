from flask import jsonify, request, abort
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import get_jwt, jwt_required, create_access_token
from app.functions.validacao_empresa_filial import acessoEmpresa
from app.models.models import User
from app.database import db
from flask_cors import cross_origin
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

def init_routes_usuario(app):
    
    # cadastrar usuario
    @app.route('/users', methods=['POST'])
    @jwt_required()
    def registrar():
        data = request.get_json()
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({'message': 'Usuário já cadastrado!'}), 409
        
        # Verificar acesso a empresa
        claims = get_jwt()
        if acessoEmpresa(claims, data['empresa_id'] ):
            return jsonify({'message': 'Sem acesso a empresa!'}), 404
        
        new_user = User(
            nome=data['nome'],
            email=data['email'],
            telefone=data['telefone'],
            password=generate_password_hash(data['password']),
            ativo=data.get('ativo', True),
            interno=data.get('interno', False),
            empresa_id=data['empresa_id'],
            cod_interno=data.get('cod_interno', '')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Usuário cadastrado com sucesso!'}), 201

    # buscar usuario pelo id 
    @app.route('/users/<int:user_id>', methods=['GET'])
    @jwt_required()
    def get_user(user_id):

        claims = get_jwt()
        empresa_id = claims.get('empresa_id', None)

        user = User.query.filter(User.id == user_id, User.empresa_id == empresa_id).first()
        if not user:
            return jsonify({'message': 'Usuário não encontrado!'}), 404
        
        # Retorna os dados do usuário em JSON
        return jsonify({
            'id': user.id,
            'nome': user.nome,
            'email': user.email,
            'telefone': user.telefone,
            'ativo': user.ativo,
            'interno': user.interno,
            'cod_interno': user.cod_interno
        })

    # alter usuario pelo id
    @app.route('/users/<int:user_id>', methods=['PUT'])
    @jwt_required()
    def update_user(user_id):
        
        claims = get_jwt()
        empresa_id = claims.get('empresa_id', None)
        user = User.query.filter(User.id == user_id, User.empresa_id == empresa_id).first()
        if not user:
            return jsonify({'message': 'Usuário não encontrado!'})

        data = request.get_json()
        if 'password' in data and data['password']:
            user.password = generate_password_hash(data['password'])
        user.nome = data.get('nome', user.nome)
        user.email = data.get('email', user.email)
        user.telefone = data.get('telefone', user.telefone)
        user.ativo = data.get('ativo', user.ativo)
        user.interno = data.get('interno', user.interno)
        user.cod_interno = data.get('cod_interno', user.cod_interno)
        db.session.commit()
        return jsonify({'message': 'Usuário atualizado com sucesso!'})

    @app.route('/users/<int:user_id>', methods=['DELETE'])
    @jwt_required()
    def delete_user(user_id):
        # user = User.query.get_or_404(user_id)
        # db.session.delete(user)
        # db.session.commit()
        return jsonify({'message': 'Usuário Não foi deletado!'})

    @app.route('/users', methods=['GET'])
    @jwt_required()
    def get_users():

        claims = get_jwt()
        empresa_id = claims.get('empresa_id', None)
        
        # Filtrar usuários apenas da empresa específica
        if empresa_id:
            users = User.query.filter_by(empresa_id=empresa_id).all()
        else:
            # Retorna uma resposta vazia ou erro se empresa_id não estiver disponível
            return jsonify({'message': 'Empresa não especificada.'}), 400

        users_list = [
            {
                'id': user.id,
                'empresa_id': user.empresa_id,
                'cod_interno': user.cod_interno,
                'nome': user.nome,
                'email': user.email,
                'telefone': user.telefone,
                'ativo': user.ativo,
                'interno': user.interno
            } for user in users
        ]

        return jsonify(users_list)


    #auterar a senha 
    @app.route('/change-password', methods=['POST'])
    @jwt_required()
    def change_password():
        additional_claims = get_jwt()
        user_id = additional_claims.get('user_id', None)
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # old_password = data.get('old_password')
        new_password = data.get('new_password')

        if not new_password:
            return jsonify({'error': 'Missing old or new password'}), 400

        user = User.query.get(user_id)
        if user is None:
            return jsonify({'error': 'User not found'}), 404

        # Verifica se a senha antiga está correta
        # if not check_password_hash(user.password, old_password):
        #     return jsonify({'error': 'Old password is incorrect'}), 401

        # Atualiza a senha com uma nova senha hasheada
        user.password = generate_password_hash(new_password)
        db.session.commit()

        return jsonify({'message': 'Password updated successfully'}), 200