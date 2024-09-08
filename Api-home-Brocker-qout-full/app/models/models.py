from app.database import db
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime, Numeric, String
from enum import Enum as PyEnum 
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, Enum
from datetime import datetime
import pytz

def current_time_local():
    utc_time = datetime.utcnow()
    local_time = utc_time.replace(tzinfo=pytz.utc).astimezone(pytz.timezone('America/Sao_Paulo'))
    return local_time
   

class Empresa(db.Model):
    id          = Column(Integer, primary_key=True)
    cod_interno = Column(Integer, nullable=True)
    cgc         = Column(String(14), unique=True, nullable=False )
    empresa     = Column(String(6), nullable=False)
    nome        = Column(String(100), nullable=False)
    valsaldo    = Column(Boolean, default=False, nullable=False)
    hrinicio    = Column(String(10), nullable=True)
    hrfinal     = Column(String(10), nullable=True)
    logomarca   = Column(String(100), nullable=True)
    tokenbot    = Column(String(100), nullable=True)
    telegran    = Column(String(255), nullable=True)
    limiteparc  = Column(Integer, nullable=True, default=5)
    integra_skn = Column(Boolean, default=False, nullable=False) 
    token_skn   = Column(String(255), nullable=True)
    appkey_skn  = Column(String(255), nullable=True)
    username_skn= Column(String(255), nullable=True)
    password_skn= Column(String(255), nullable=True)
    integra_gar = Column(Boolean, default=False, nullable=False)
    ativo       = Column(Boolean, default=True, nullable=False)
    autovenda   = Column(Boolean, default=True, nullable=False)
    autovenda_empresa_id = Column(Integer, nullable=True)
    autovenda_urs = Column(String(255), nullable=True)
    autovenda_pwd = Column(String(255), nullable=True)

    def to_Empresa(self):
        return {
            'id': self.id,
            'cod_interno': self.cod_interno,
            'cgc': self.cgc,
            'empresa': self.empresa,
            'nome': self.nome,
            'valsaldo': self.valsaldo,
            'hrinicio': self.hrinicio,
            'hrfinal' : self.hrfinal ,
            'logomarca': self.logomarca,
            'tokenbot': self.tokenbot,
            'telegran': self.telegran,
            'limiteparc': self.limiteparc ,
            'integra_skn': self.integra_skn,
            'token_skn': self.token_skn,  
            'appkey_skn': self.appkey_skn,  
            'username_skn': self.username_skn,
            'password_skn': self.password_skn,
            'integra_gar': self.integra_gar,
            'ativo': self.ativo,
            'autovenda': self.autovenda,
            'autovenda_empresa_id': self.autovenda_empresa_id,
            'autovenda_urs': self.autovenda_urs,
            'autovenda_pwd': self.autovenda_pwd
        }
    
class Grupo(db.Model):
    id          = Column(Integer, primary_key=True)
    empresa_id  = Column(Integer, ForeignKey('empresa.id'), nullable=False)
    nome        = Column(String(40), unique=True, nullable=False)
    ativo       = Column(Boolean, default=True, nullable=False)
    empresa     = relationship("Empresa")

    def to_dict(self):
        return {
            'id' : self.id,   
            'empresa_id': self.empresa_id,
            'nome' : self.nome,
            'ativo' : self.ativo,
            'empresa':self.empresa
        }
    

class SaldoGrupo(db.Model):
    id          = Column(Integer, primary_key=True)
    grupo_id    = Column(Integer, ForeignKey('grupo.id'), nullable=True)
    quantide    = Column(Numeric(10), nullable=False)
    created_at  = Column(DateTime, default=current_time_local)
    updated_at  = Column(DateTime, default=current_time_local, onupdate=current_time_local)
    grupo       = relationship("Grupo")

    def to_dict(self):
        return {
            'id'    : self.id,      
            'grupo_id'  : self.grupo_id,
            'quantide'  : self.quantide,
            'created_at' : format_datetime_br(self.created_at),
            'updated_at' : format_datetime_br(self.updated_at),
        }

class Parceiro(db.Model):
    id          = Column(Integer, primary_key=True)
    cod_interno = Column(Integer, nullable=True)
    empresa_id  = Column(Integer, ForeignKey('empresa.id'), nullable=False)
    grupo_id    = Column(Integer, ForeignKey('grupo.id'), nullable=True)
    cgc         = Column(String(14), unique=True, nullable=False) 
    nome        = Column(String(100), nullable=False)
    lmt_trava   = Column(Numeric(10, 2), nullable=False)
    lmt_mes     = Column(Numeric(10, 2), nullable=False)
    plano       = Column(Numeric(10, 3), nullable=False)
    ativo       = Column(Boolean, default=True, nullable=False)
    empresa     = relationship("Empresa")

    def to_dict(self):
        return {
            'id': self.id,
            'cod_interno': self.cod_interno ,
            'empresa_id': self.empresa_id,
            'cgc': self.cgc,
            'nome': self.nome,
            'lmt_trava': self.lmt_trava,
            'lmt_mes': self.lmt_mes,
            'plano': self.plano,
            'ativo': self.ativo,
            'empresa': self.empresa     
        }

class Trava(db.Model):
    id              = Column(Integer, primary_key=True)
    empresa_id      = Column(Integer, ForeignKey('empresa.id'), nullable=False)
    produto_id      = Column(String(30), default="OURO")
    parceiro_id     = Column(Integer, ForeignKey('parceiro.id'), nullable=False)
    usuario_id      = Column(Integer, ForeignKey('user.id'), nullable=False)
    quantidade      = Column(Numeric(10, 3), nullable=False)
    preco_unitario  = Column(Numeric(10, 2), nullable=False)
    preco_total     = Column(Numeric(10, 2), nullable=False)
    cotacao         = Column(Numeric(10, 2), nullable=False)
    desagio         = Column(Numeric(10, 3), nullable=False)
    dollar          = Column(Numeric(10, 3), nullable=False)
    ativo           = Column(Boolean, default=True, nullable=False)
    status          = Column(String(3), default="A", nullable=False)
    integrado       = Column(String(3), default="N", nullable=False)
    removido        = Column(Boolean, default=False, nullable=False)
    created_at      = Column(DateTime, default=current_time_local)
    updated_at      = Column(DateTime, default=current_time_local, onupdate=current_time_local)
    usuario         = relationship("User")
    empresa         = relationship("Empresa")
    parceiro        = relationship("Parceiro")

    def to_dict(self):
        return {
            'id'            : self.id,
            'empresa_id'    : self.empresa_id,
            'produto_id'    : self.produto_id,
            'parceiro_id'   : self.parceiro_id,
            'usuario_id'    : self.usuario_id,
            'quantidade'    : self.quantidade,
            'preco_unitario': self.preco_unitario,
            'preco_total'   : self.preco_total,
            'ativo'         : self.ativo,
            'status'        : self.status,
            'dollar'        : self.dollar,
            'integrado'     : self.integrado,
            'created_at'    : format_datetime_br(self.created_at),
            'updated_at'    : format_datetime_br(self.updated_at),
            'usuario'       : self.usuario,
            'empresa'       : self.empresa,
            'parceiro'      : self.parceiro      
        }
    
def format_datetime_br(date):
    return date.strftime('%d/%m/%Y %H:%m') if date else ''


class User(db.Model):
    id          = Column(Integer, primary_key=True)
    empresa_id  = Column(Integer, ForeignKey('empresa.id'), nullable=False)
    cod_interno = Column(String(11), nullable=False)
    password    = Column(String(250), nullable=False)
    nome        = Column(String(80), nullable=False)
    email       = Column(String(80), nullable=False)
    telefone    = Column(String(80), nullable=False)
    ativo       = Column(Boolean, default=True, nullable=False)
    interno     = Column(Boolean, default=True, nullable=False)
    empresa     = relationship("Empresa")
    
    def to_dict(self):
        return {
            'id'         : self.id,     
            'empresa_id' : self.empresa_id,
            'cod_interno': self.cod_interno,
            'password'   : self.password,
            'nome'       : self.nome,
            'email'      : self.email,
            'telefone'   : self.telefone,
            'ativo'      : self.ativo,
            'interno'    : self.interno
        }

class Acessos(db.Model):
    id          = Column(Integer, primary_key=True)
    usuario_id  = Column(Integer, ForeignKey('user.id'), nullable=False)
    empresa_id  = Column(Integer, ForeignKey('empresa.id'), nullable=False)
    parceiro_id = Column(Integer, ForeignKey('parceiro.id'), nullable=False) 
    ativo       = Column(Boolean, default=True, nullable=False)
    usuario     = relationship("User")
    empresa     = relationship("Empresa")
    parceiro    = relationship("Parceiro")

    def to_dict(self):
        return {
            'id'          : self.id         ,
            'usuario_id'  : self.usuario_id ,
            'empresa_id'  : self.empresa_id ,
            'parceiro_id' : self.parceiro_id,
            'ativo'       : self.ativo      ,
            'usuario'     : self.usuario    ,
            'empresa'     : self.empresa    ,
            'parceiro'    : self.parceiro   
        }
    
class Roles(db.Model):
    id              = Column(Integer, primary_key=True)
    usuario_id      = Column(Integer, ForeignKey('user.id'), nullable=False)
    cad_empresa     = Column(Boolean, default=True, nullable=False)
    cad_parceiro    = Column(Boolean, default=True, nullable=False)
    cad_usuario     = Column(Boolean, default=True, nullable=False)
    cad_contacao    = Column(Boolean, default=True, nullable=False)
    cancelar        = Column(Boolean, default=False, nullable=False)

    def to_dict(self):
        return {
            'id'           : self.id,
            'usuario_id'   : self.usuario_id,
            'cad_empresa'  : self.cad_empresa,
            'cad_usuario'  : self.cad_usuario,
            'cad_contacao' : self.cad_contacao,
            'cancelar'     : self.cancelar 
        }
    

class Firebase(db.Model):
    id          = Column(Integer, primary_key=True)
    empresa_id  = Column(Integer, ForeignKey('empresa.id'), nullable=False)
    usuario_id  = Column(Integer, ForeignKey('user.id'), nullable=False)
    token       = Column(String(255), nullable=True)
    interno     = Column(Boolean, default=False, nullable=False)
    created_at  = Column(DateTime, default=current_time_local)
    updated_at  = Column(DateTime, default=current_time_local, onupdate=current_time_local)

    empresa     = relationship("Empresa")
    usuario     = relationship("User")

    def to_dict(self):
        return {
            'id': self.id,
            'empresa_id': self.empresa_id,
            'usuario_id': self.usuario_id,
            'token': self.token,
            'interno': self.interno,
            'created_at': format_datetime_br(self.created_at),
            'updated_at': format_datetime_br(self.updated_at),
        }
    

class Integracao(db.Model):
    id          = Column(Integer, primary_key=True)
    id_trava    = Column(Integer, index=True, nullable=False)
    codcontrole = Column(Integer, index=True, nullable=False)
    sucesso     = Column(Boolean, default=False)
    mensagem    = Column(String(255), nullable=True)
    created_at  = Column(DateTime, default=current_time_local)
    updated_at  = Column(DateTime, default=current_time_local, onupdate=current_time_local)

    def to_integracao(self):
        return {
            'id'         : self.id          ,
            'id_trava'   : self.id_trava    ,
            'codcontrole': self.codcontrole ,
            'sucesso'    : self.sucesso     ,
            'mensagem'   : self.mensagem    , 
            'created_at' : self.created_at  ,
            'updated_at' : self.updated_at  
        }