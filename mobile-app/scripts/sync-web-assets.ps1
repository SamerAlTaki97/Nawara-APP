$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$mobileRoot = Split-Path -Parent $scriptDir
$projectRoot = Split-Path -Parent $mobileRoot
$wwwDir = Join-Path $mobileRoot "www"
$assetsDir = Join-Path $wwwDir "assets"

New-Item -ItemType Directory -Path $wwwDir -Force | Out-Null
New-Item -ItemType Directory -Path $assetsDir -Force | Out-Null

$sourceHtml = Join-Path $projectRoot "new index.html"
$sourceJs = Join-Path $projectRoot "new-app.js"
$targetHtml = Join-Path $wwwDir "index.html"
$targetJs = Join-Path $wwwDir "new-app.js"
$sourceIcon = Join-Path $mobileRoot "assets\\icon-1024.png"
$targetIcon = Join-Path $assetsDir "icon-1024.png"

Copy-Item -LiteralPath $sourceHtml -Destination $targetHtml -Force
Copy-Item -LiteralPath $sourceJs -Destination $targetJs -Force

if (Test-Path -LiteralPath $sourceIcon) {
  Copy-Item -LiteralPath $sourceIcon -Destination $targetIcon -Force
}

$html = Get-Content -LiteralPath $targetHtml -Raw
$html = $html -replace '<title>.*?</title>', '<title>WzZzZz</title>'

if ($html -notmatch 'manifest\.webmanifest') {
  $replacement = @'
<meta name="theme-color" content="#1a4a7a">
<link rel="manifest" href="./manifest.webmanifest">
<link rel="icon" type="image/png" href="./assets/icon-1024.png">
'@
  $html = $html -replace '(<meta name="viewport" content="[^"]+">)', "`$1`r`n$replacement"
}

if ($html -notmatch 'capacitor\.js') {
  $html = $html -replace '(<script src="\./new-app\.js\?[^"]+"></script>)', "<script src=""./capacitor.js""></script>`r`n`$1"
}

Set-Content -LiteralPath $targetHtml -Value $html -Encoding UTF8

$manifest = @'
{
  "name": "WzZzZz",
  "short_name": "WzZzZz",
  "display": "standalone",
  "background_color": "#eef1f6",
  "theme_color": "#1a4a7a",
  "lang": "ar",
  "start_url": "./index.html",
  "icons": [
    {
      "src": "./assets/icon-1024.png",
      "sizes": "1024x1024",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
'@

Set-Content -LiteralPath (Join-Path $wwwDir "manifest.webmanifest") -Value $manifest -Encoding UTF8
Write-Output "Mobile web assets synced to $wwwDir"
