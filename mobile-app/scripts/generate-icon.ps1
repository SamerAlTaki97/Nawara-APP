$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$mobileRoot = Split-Path -Parent $scriptDir
$assetsDir = Join-Path $mobileRoot "assets"
$sourceIcon = Join-Path $assetsDir "tooth-source.png"
$outputIcon = Join-Path $assetsDir "icon-1024.png"

New-Item -ItemType Directory -Path $assetsDir -Force | Out-Null

if (-not (Test-Path -LiteralPath $sourceIcon)) {
  throw "Icon source image not found: $sourceIcon"
}

$size = 1024
$padding = 88
$canvas = New-Object System.Drawing.Bitmap $size, $size
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$graphics.Clear([System.Drawing.Color]::Transparent)

$image = [System.Drawing.Image]::FromFile($sourceIcon)
$targetWidth = $size - ($padding * 2)
$targetHeight = $size - ($padding * 2)
$scale = [Math]::Min($targetWidth / $image.Width, $targetHeight / $image.Height)
$drawWidth = [int][Math]::Round($image.Width * $scale)
$drawHeight = [int][Math]::Round($image.Height * $scale)
$drawX = [int][Math]::Round(($size - $drawWidth) / 2)
$drawY = [int][Math]::Round(($size - $drawHeight) / 2)

$imageAttributes = New-Object System.Drawing.Imaging.ImageAttributes
$imageAttributes.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)

$destinationRect = New-Object System.Drawing.Rectangle $drawX, $drawY, $drawWidth, $drawHeight
$graphics.DrawImage(
  $image,
  $destinationRect,
  0,
  0,
  $image.Width,
  $image.Height,
  [System.Drawing.GraphicsUnit]::Pixel,
  $imageAttributes
)

$canvas.Save($outputIcon, [System.Drawing.Imaging.ImageFormat]::Png)

$imageAttributes.Dispose()
$image.Dispose()
$graphics.Dispose()
$canvas.Dispose()

Write-Output "Transparent app icon generated at $outputIcon"
