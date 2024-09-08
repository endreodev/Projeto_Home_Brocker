from app.database import db
from datetime import datetime
from app.models.models import Integracao, Trava
from datetime import datetime
from app.models.models import Empresa, Integracao, Parceiro
import requests
import json

def gerar_token_sankhya():


    url = "https://api.sankhya.com.br/login"
    headers = {
        'token':    'bd0c867e-b4c7-4541-89b3-9f79ba97472f', #'40652ddd-d607-4fed-b05d-716eecb469b9',
        'appkey':   'e0cc0261-c2b7-4b89-8f7c-8380a5e684cf',
        'username': 'endreo.figueiredo@fenixpar.com.br',
        'password': 'Samurai@12'
    }
    try:
        response = requests.post(url, headers=headers)
        response_data = response.json()
        if 'bearerToken' in response_data:
            return response_data['bearerToken']
        else:
            raise ValueError("Token não recebido ou resposta inesperada: " + json.dumps(response_data))
    except requests.RequestException as e:
        raise ConnectionError(f"Erro de conexão ao API Sankhya: {str(e)}")
    except json.JSONDecodeError:
        raise ValueError("A resposta não é JSON válido.")


def cadastrar_cabecalho_operacao(dados_trava):
    
    empresa = Empresa.query.get(dados_trava.empresa_id)
    
    token = gerar_token_sankhya()
    print(token)
    url_cabecalho = "https://api.sankhya.com.br/gateway/v1/mge/service.sbr?application=RegistroOperacoes&outputType=json&serviceName=DatasetSP.save"
    payload_cabecalho = json.dumps({
        "serviceName": "DatasetSP.save",
        "requestBody": {
            "dataSetID": "00D",
            "entityName": "FexRegistroOperacoes",
            "standAlone": False,
            "fields": [
                "PESOTOTALRESTVE", "DHOPER", "STATUSCAMB", "PESOTOTALG", "OBS",
                "TIPO", "CODUSULCO", "Usuario.NOMEUSU", "VLRTOTAL", "STATUSVEN",
                "STATUSOPER", "CODFORFICHA", "Parceiro.NOMEPARC", "CODEMP",
                "Empresa.NOMEFANTASIA", "QTD", "VLRTOTALRESTCB", "STATUSCP", "CODCONTROLE"
            ],
            "records": [
                {
                    "values": {
                        "5": "EX",
                        "13": empresa.cod_interno  ,
                        "14": empresa.nome
                    }
                }
            ],
            "ignoreListenerMethods": "",
            "clientEventList": {
                "clientEvent": [
                    {
                        "$": "br.com.sankhya.actionbutton.clientconfirm"
                    }
                ]
            }
        }
    })
    headers_cabecalho = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    try:
        response_cabecalho = requests.post(url_cabecalho, headers=headers_cabecalho, data=payload_cabecalho)
        response_data_cabecalho = response_cabecalho.json()

        # Verificar sucesso na resposta do cabeçalho e proceder com o cadastro dos itens
        if response_data_cabecalho.get("status") == "1":

            cod_controle = response_data_cabecalho['responseBody']['result'][0][-1]
            print(cod_controle)
            cadastrar_itens_operacao(cod_controle, token, dados_trava)
            encerrar_operacao(cod_controle, token, dados_trava)
            return 

        else:
            return {"error": True, "message": "Erro ao registrar cabeçalho da operação"}
        
    except requests.RequestException as e:
        raise ConnectionError(f"Erro de conexão ao API Sankhya: {str(e)}")
    except json.JSONDecodeError:
        raise ValueError("A resposta não é JSON válido.")




def cadastrar_itens_operacao(cod_controle, token, dados_trava):

    dados_parceiro = Parceiro.query.get(dados_trava.parceiro_id)
    
    url_itens = "https://api.sankhya.com.br/gateway/v1/mge/service.sbr?serviceName=DatasetSP.save&counter=97&application=RegistroOperacoes&outputType=json"
    payload_itens = json.dumps({
        "serviceName": "DatasetSP.save",
        "requestBody": {
            "dataSetID": "01J",
            "entityName": "FexRegistroOperacaoCompra",
            "standAlone": False,
            "fields": [
                "GFICHA", 
                "ID", 
                "CODFORNNOTA", 
                "ParceiroFornecedor.NOMEPARC", 
                "BASE10", 
                "VLRDEDUCAO", 
                "STATUSCP", 
                "VLRBRUTO", 
                "IRCONFTABELA", 
                "IROPANTERIORES", 
                "TIPOPRODUTO", 
                "IRNEGANTERIOR", 
                "CODCONTROLE", 
                "DTVENC", 
                "CODCOMMODITY", 
                "FEXCOMMODITY.DESCRCOM", 
                "CODFORNFICHA", 
                "Parceiro.NOMEPARC", 
                "VLTANTTOTFECH", 
                "ALIQUOTAIRRF", 
                "DDOPER", 
                "DHNEG", 
                "DTALTER", 
                "VRLNEGANTERIOR", 
                "QTDOZ", 
                "VLRCOMPRA", 
                "NUNOTA", 
                "QTD", 
                "IRDEDUCAO", 
                "VLTBRUTFECHA"
            ],
            "records": [
                {
                    "foreignKey": {
                        "CODCONTROLE": str(cod_controle)
                    },
                    "values": {
                        "2": str(dados_parceiro.cod_interno)  , 
                        "3": str(dados_parceiro.nome), 
                        "7": str(dados_trava.preco_total), 
                        "14": "1", 
                        "15": "OURO BRUTO", 
                        "16": str(dados_parceiro.cod_interno), 
                        "17": str(dados_parceiro.nome), 
                        "25": str(dados_trava.preco_unitario), 
                        "27": str(dados_trava.quantidade)
                    }
                }
            ],
            "ignoreListenerMethods": "",
            "clientEventList": {
                "clientEvent": [
                    {
                        "$": "br.com.sankhya.actionbutton.clientconfirm"
                    }
                ]
            }
        }
    })
    headers_itens = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    response_itens = requests.post(url_itens, headers=headers_itens, data=payload_itens)
    response_data_itens = response_itens.json()

    # Verificar resposta do cadastro de itens
    if response_data_itens.get("status") == "1":
        registrar_integracao(dados_trava.id, str(cod_controle), True, 'Success')

        travadb = Trava.query.get(dados_trava.id)
        travadb.integrado = 'S'
        db.session.commit()

        return {"error": False, "message": "Cadastro de itens realizado com sucesso"}
    else:
        return {"error": True, "message": "Erro ao registrar itens da operação"}



def encerrar_operacao(cod_controle, token, dados_trava):

    url = "https://api.sankhya.com.br/gateway/v1/fenixcontroleoperacoes/service.sbr?serviceName=FexRegistroOperacoesSP.aprovaOperacao&application=RegistroOperacoes&outputType=json"

    payload_itens = json.dumps({
        "serviceName":"FexRegistroOperacoesSP.aprovaOperacao",
        "requestBody":  {
                            "CODCONTROLE": str(cod_controle),
                            "TIPOPERACAO": 1,
                            "clientEventList": { "clientEvent": [{ "$": "br.com.sankhya.actionbutton.clientconfirm" } ]}
                        }
    })
    #payload = "{\r\n    \"serviceName\": \"FexRegistroOperacoesSP.aprovaOperacao\",\r\n    \"requestBody\": {\r\n        \"CODCONTROLE\": "+cod_controle+",\r\n        \"TIPOPERACAO\": 1,\r\n        \"clientEventList\": {\r\n            \"clientEvent\": [\r\n                {\r\n                    \"$\": \"br.com.sankhya.actionbutton.clientconfirm\"\r\n                }\r\n            ]\r\n        }\r\n    }\r\n}"
    headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'pt-BR',
    'appkey': 'null',
    'content-type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer '+token
    }

    response = requests.request("POST", url, headers=headers, data=payload_itens)
    if response.get("status") == "1":
        print(response.text)
        return {"error": False, "message": "Cadastro de itens realizado com sucesso"}
    else:
        return {"error": True, "message": "Erro ao registrar itens da operação"}


# # Executar a função e imprimir o resultado
# resultado = cadastrar_cabecalho_operacao()
# print(resultado)

# Chamando a função para obter o token
# try:
#     token = gerar_token_sankhya()
#     print(f"Token obtido: {token}")
# except Exception as e:
#     print(f"Erro ao obter o token: {str(e)}")

def registrar_integracao(id_trava, codcontrole, sucesso, mensagem):
    nova_integracao = Integracao(
        id_trava=id_trava,
        codcontrole=codcontrole,
        sucesso=sucesso,
        mensagem=mensagem,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(nova_integracao)
    db.session.commit()

def enviar_operacao(id_trava):
    try:
       
        dados_trava = Trava.query.get(id_trava)
        if not dados_trava:
            return {"error": True, "message": "Dados da trava não encontrados"}
        
        # integracao = Integracao.query.filter_by(id_trava=id_trava).all()
        # if integracao:
        #     return {"error": True, "message": "Registro já integrado"}

        cadastrar_cabecalho_operacao(dados_trava)
        
        return {"error": False, "message": "Dados da cadastrados com sucesso"}

    except Exception as e:
        registrar_integracao(id_trava, None, False, str(e))
        return {"error": True, "message": str(e)}