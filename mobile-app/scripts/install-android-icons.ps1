$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$mobileRoot = Split-Path -Parent $scriptDir
$sourceResDir = Join-Path $mobileRoot "android-res"
$targetResDir = Join-Path $mobileRoot "android\app\src\main\res"

if (-not (Test-Path -LiteralPath $sourceResDir)) {
  throw "Android icon source resources not found: $sourceResDir"
}

if (-not (Test-Path -LiteralPath $targetResDir)) {
  throw "Android platform resources directory not found: $targetResDir"
}

Get-ChildItem -LiteralPath $sourceResDir | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $targetResDir -Recurse -Force
}
Write-Output "Android launcher icons copied to $targetResDir"
