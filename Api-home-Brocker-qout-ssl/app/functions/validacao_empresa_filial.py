from datetime import datetime

from flask import jsonify

from app.models.models import Acessos



def acessoEmpresa(claims , empresa): 

    user_id = claims.get('user_id', None)
    empresa_id = claims.get('empresa_id', None)

    if empresa_id == empresa:
        return True
    else:
        return False
    

def acessoFilial(claims, filial_id):
    user_id = claims.get('user_id', None)
    
    # Consulta para buscar os parceiros aos quais o usuário tem acesso
    acessos = Acessos.query.filter_by(usuario_id=user_id, ativo=True).all()
    if not acessos:
        return False

    # Verifica se o ID da filial está na lista de IDs dos parceiros acessíveis pelo usuário
    return any(acesso.parceiro_id == filial_id for acesso in acessos)
    

def inFiliais(claims):
    user_id = claims.get('user_id', None)    
    # Consulta para buscar os parceiros aos quais o usuário tem acesso
    acessos = Acessos.query.filter_by(usuario_id=user_id, ativo=True).all()
    if not acessos:
        return ""

    # Cria uma lista dos IDs dos parceiros
    parceiro_ids = [acesso.parceiro_id for acesso in acessos]
    return parceiro_ids