new_empresa = Empresa(
            cgc=data['cgc'],
            empresa=data['empresa'],
            nome=data['nome'],
            ativo=data.get('ativo', True)  # Assume true se não especificado
        )

flask db init: Inicializa o diretório de migração.
flask db migrate: Gera os arquivos de migração automaticamente a partir das diferenças detectadas nos modelos.
flask db upgrade: Aplica as migrações ao banco de dados para sincronizar os modelos com o banco de dados.
flask db downgrade: Reverte a última migração aplicada.


flask db init
flask db migrate -m "Descrição da migração"
flask db upgrade
flask db downgrade


pip install geoip2


# Gerar Certificado Digital
# abra Ubuntu no WSL 
# instale
apt install nginx certbot python3-certbot-nginx

sudo certbot certonly --manual -d goldbeam.com.br -d www.goldbeam.com.br

# libere  o arquivo para ser copiado 
 chmod 666 privkey.pem
# copie as chaves e crie os arquivos 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# va ate a pasta /etc/letsencrypt/live/goldbeam.com.br/
# copie os arquivos para seu servidor

# Successfully received certificate.
# Certificate is saved at: /etc/letsencrypt/live/goldbeam.com.br/fullchain.pem
# Key is saved at:         /etc/letsencrypt/live/goldbeam.com.br/privkey.pem
# This certificate expires on 2024-11-09.
# These files will be updated when the certificate renews.