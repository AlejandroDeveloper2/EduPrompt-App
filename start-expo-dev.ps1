# start-expo-dev.ps1

$ip = Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object {
        $_.IPAddress -notlike "127.*" -and
        $_.InterfaceAlias -notmatch "Virtual|Loopback|vEthernet"
    } |
    Select-Object -First 1 -ExpandProperty IPAddress

if (-not $ip) {
    Write-Host "❌ No se pudo detectar tu IP local."
    exit
}

Write-Host "✅ IP local detectada: $ip"
Write-Host "🚀 Iniciando Metro bundler con IP fija..."

$env:REACT_NATIVE_PACKAGER_HOSTNAME = $ip
npx expo start --dev-client --host lan --clear

