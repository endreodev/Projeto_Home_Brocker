param(
    [string]$ipToBlock
)


# $ipToBlock = "147.182.134.71"

# Nome da regra no Firewall
$ruleName = "BLOQUEIO DE IP = $ipToBlock"



# Adiciona a regra ao Firewall do Windows
New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -Action Block -RemoteAddress $ipToBlock -Protocol TCP
