# snap to buy · rebuild every generated file (PDF, PNG) from its source.
# Usage (PowerShell, from anywhere):  powershell -ExecutionPolicy Bypass -File tools\build.ps1
# Needs: Microsoft Edge or Google Chrome, Node.js (for Markdown → HTML).
# Run only the parts you need:  -Only deck,docs,slides,shots

param([string[]]$Only = @('shots','slides','deck','docs'))

$ErrorActionPreference = 'Stop'
$Only = @($Only | ForEach-Object { $_ -split ',' } | ForEach-Object { $_.Trim() })   # -Only a,b via powershell -File arrives as one string
$root = Split-Path -Parent $PSScriptRoot
$tmp  = Join-Path $env:TEMP 'snap-to-buy-build'
New-Item -ItemType Directory -Force $tmp | Out-Null

$browser = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw 'Edge or Chrome not found.' }
$prof = Join-Path $tmp ('profile-' + [guid]::NewGuid().ToString('N'))   # fresh profile = no cached pages

function Url($path) { ([System.Uri]::new((Resolve-Path $path).Path)).AbsoluteUri }
function Run($argv) { Start-Process $browser -ArgumentList (@('--headless=new','--disable-gpu',"--user-data-dir=$prof") + $argv) -Wait -WindowStyle Hidden }
function ToPdf($html, $pdf) { $out = Join-Path $tmp 'out.pdf'; Remove-Item $out -ErrorAction SilentlyContinue; Run @('--no-pdf-header-footer','--virtual-time-budget=20000',"--print-to-pdf=$out",(Url $html)); Copy-Item $out $pdf -Force; Write-Host "PDF  $pdf" }
function ToPng($html, $png, $w, $h, $scale = 1, $hash = '') { Run @('--hide-scrollbars',"--window-size=$w,$h","--force-device-scale-factor=$scale",'--virtual-time-budget=8000',"--screenshot=$png",((Url $html) + $hash)); Write-Host "PNG  $png" }

# 1) Mockup screenshots used by the deck (mockup supports deep links: #s=N, #p=panel, #pay=mode, #scroll=px, #done=1)
if ($Only -contains 'shots') {
  $mock = Join-Path $root 'mockup\index.html'; $img = Join-Path $root 'slides\img'
  New-Item -ItemType Directory -Force $img | Out-Null
  $shots = [ordered]@{ home='#s=0&scroll=40'; upload='#p=upload'; analyze='#s=1'; breakdown='#s=2'; budget='#s=3&scroll=150';
                       taste='#p=mypage'; pay='#s=4&scroll=470&done=1'; wait='#s=4&pay=wait&scroll=380'; swap='#s=5&pay=all&scroll=470' }
  foreach ($k in $shots.Keys) { ToPng $mock (Join-Path $img "$k.png") 500 980 2 $shots[$k] }
}

# 2) Single slides (1920x1080) → PNG + PDF
if ($Only -contains 'slides') {
  foreach ($n in @('왜_에이전트인가','아키텍처')) {
    $src = Join-Path $root "slides\$n.html"
    ToPng $src (Join-Path $root "slides\$n.png") 1920 1080
    ToPdf $src (Join-Path $root "slides\$n.pdf")
  }
}

# 3) Pitch deck → PDF
if ($Only -contains 'deck') { ToPdf (Join-Path $root 'slides\deck.html') (Join-Path $root 'slides\snap-to-buy_발표자료.pdf') }

# 4) Documents → PDF
if ($Only -contains 'docs') {
  ToPdf (Join-Path $root 'docs\snap-to-buy_기획서.html') (Join-Path $root 'docs\snap-to-buy_기획서.pdf')
  $md = [ordered]@{ '기술_가이드'='Technical guide'; '쟁점_정리'='Issues & limits'; '참고_저장소_분석'='Reference repositories'; '발표전_반영안'='Before the pitch' }
  foreach ($n in $md.Keys) {
    $html = Join-Path $tmp "$n.html"
    node (Join-Path $PSScriptRoot 'md2html.js') (Join-Path $root "docs\$n.md") $html "Future Commerce Challenge 2026 · $($md[$n])" | Out-Null
    ToPdf $html (Join-Path $root "docs\$n.pdf")
  }
}
Write-Host 'Done.'
