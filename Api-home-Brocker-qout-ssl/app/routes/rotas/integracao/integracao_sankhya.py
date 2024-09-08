import requests
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

from app.models.models import Integracao

Base = declarative_base()


class IntegracaoAPI:
    def __init__(self, api_url, username, password, appkey):
        self.api_url = api_url
        self.token = None
        self.headers = {
            'appkey': appkey,
            'username': username,
            'password': password
        }

    def autenticar(self):
        """Autentica na API e atualiza o token de acesso."""
        url = f"{self.api_url}/login"
        response = requests.post(url, headers=self.headers)
        if response.status_code == 200:
            self.token = response.json().get('token')
            self.headers['Authorization'] = f"Bearer {self.token}"
            return True
        return False

    def enviar_dados(self, id_trava, dados):
        """Envia dados para a API e registra a operação."""
        if not self.token:
            if not self.autenticar():
                return False

        url = f"{self.api_url}/gateway/v1/mge/service.sbr?application=RegistroOperacoes&outputType=json&serviceName=DatasetSP.save"
        response = requests.post(url, headers=self.headers, json=dados)

        # Registra a operação na base de dados
        registro = Integracao(
            id_trava=id_trava,
            sucesso=response.status_code == 200,
            mensagem=response.text if response.status_code != 200 else 'Sucesso'
        )
        # Aqui você deve adicionar o código para salvar o registro no banco de dados
        # Exemplo: session.add(registro); session.commit()

        return registro.sucesso

# Exemplo de uso
integracao = IntegracaoAPI(
    api_url="https://api.sankhya.com.br",
    username="endreo.figueiredo@fenixpar.com.br",
    password="Samurai@12",
    token="40652ddd-d607-4fed-b05d-716eecb469b9",
    appkey="e0cc0261-c2b7-4b89-8f7c-8380a5e684cf"
)

dados = {
    # Payload conforme o exemplo fornecido
}

resultado = integracao.enviar_dados(id_trava=12345, dados=dados)
print("Sucesso na integração:" if resultado else "Falha na integração")
