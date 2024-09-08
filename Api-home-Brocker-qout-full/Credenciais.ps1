param(
    [string]$ipToBlock 
)

$username = "Administrator"
$password = "Cw4684s485"

$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$credentials = New-Object System.Management.Automation.PSCredential ($username, $securePassword)

$scriptPath = "C:\Users\Administrator\Desktop\Projetos\Api-home-Brocker-qout-full\BlockIP.ps1"

Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`" -ipToBlock $ipToBlock" -Credential $credentials