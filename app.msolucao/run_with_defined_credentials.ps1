# Define variáveis
$repositoryPath = "C:\Users\Administrator\Desktop\Projetos\app.msolucao"
$buildOutputPath = "C:\Users\Administrator\Desktop\Projetos\app.msolucao\dist\home-broker-interno\browser"
$destinationPath = "C:\xampp\htdocs\"
$webhookGitPath = "C:\xampp\htdocs\webhook-git"


# Função para exibir mensagens coloridas
function Write-Color {
    param(
        [Parameter(Position = 0, Mandatory = $true)]
        [string]$Text,
        [Parameter(Position = 1, Mandatory = $true)]
        [ConsoleColor]$Color
    )
    $currentColor = $Host.UI.RawUI.ForegroundColor
    $Host.UI.RawUI.ForegroundColor = $Color
    Write-Host $Text
    $Host.UI.RawUI.ForegroundColor = $currentColor
}

# Navegar para o diretório do repositório
Write-Color "Navigating to repository directory..." Yellow
Set-Location $repositoryPath

try {
    # Fazer pull do repositório
    Write-Color "Pulling latest changes from repository..." Yellow
    git pull

    # Instalar dependências
    Write-Color "Installing dependencies from project..." Yellow
    npm install --legacy-peer-deps

    # Fazer build do projeto
    Write-Color "Building the Angular project..." Yellow
    npm run build

    # Pausa de 5 segundos
    Write-Color "Pausing for 2 seconds..." Yellow
    Start-Sleep -Seconds 2

    # Verificar se o build foi bem-sucedido
    if ($?) {
        Write-Color "Build successful!" Green

        # Criar um diretório temporário para armazenar o conteúdo da pasta webhook-git, se existir
        $tempWebhookGitPath = Join-Path -Path $env:TEMP -ChildPath "webhook-git"
        if (Test-Path $webhookGitPath) {
            Write-Color "Preserving webhook-git directory..." Yellow
            Copy-Item -Path $webhookGitPath -Destination $tempWebhookGitPath -Recurse
        }

        # Remover o diretório de destino se ele existir, exceto a pasta webhook-git
        if (Test-Path $destinationPath) {
            Write-Color "Removing existing destination directory except webhook-git..." Yellow
            Get-ChildItem -Path $destinationPath | Where-Object { $_.Name -ne "webhook-git" } | Remove-Item -Recurse -Force
        }

        # Criar o diretório de destino se não existir
        if (-not (Test-Path $destinationPath)) {
            Write-Color "Creating destination directory..." Yellow
            New-Item -ItemType Directory -Path $destinationPath
        }

        # Restaurar a pasta webhook-git, se não existir
        if (Test-Path $tempWebhookGitPath ){
            if(-not (Test-Path $webhookGitPath)) {
                Write-Color "Restoring webhook-git directory..." Yellow
                Copy-Item -Path $tempWebhookGitPath -Destination $destinationPath -Recurse
                Remove-Item -Recurse -Force $tempWebhookGitPath
            }
        }

        # Copiar os arquivos de build para o diretório de destino
        Write-Color "Copying build output to destination directory..." Yellow
        Copy-Item -Path "$buildOutputPath\*" -Destination $destinationPath -Recurse

        # Define o conteúdo do arquivo .htaccess
        $htaccessContent = @"
RewriteEngine On
RewriteBase /

# Excluir a pasta webhook-git do redirecionamento
RewriteCond %{REQUEST_URI} !^/webhook-git

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)$ index.html?uri=$1 [QSA,L]
"@


        # Define o caminho completo para o arquivo .htaccess
        $htaccessFilePath = Join-Path -Path $destinationPath -ChildPath ".htaccess"

        # Cria o arquivo .htaccess com o conteúdo fornecido
        Set-Content -Path $htaccessFilePath -Value $htaccessContent

        Write-Host ".htaccess file created successfully at $htaccessFilePath"

        Write-Color "Files copied successfully!" Green


    } else {
        Write-Color "Build failed. Please check the output for errors." Red
    }
} catch {
    Write-Color "An error occurred: $_" Red
}