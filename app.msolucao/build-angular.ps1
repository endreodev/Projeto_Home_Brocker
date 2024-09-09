# Definir usuário e senha
$username = "Administrator"
$password = "Cw4684s485"

# Converter senha em um objeto de segurança
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$credentials = New-Object System.Management.Automation.PSCredential ($username, $securePassword)

# Caminho para o script PowerShell a ser executado
$scriptPath = "C:\Users\Administrator\Desktop\Projetos\app.msolucao\run_with_defined_credentials.ps1"

# Executar o script com as credenciais fornecidas
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`"" -Credential $credentials
