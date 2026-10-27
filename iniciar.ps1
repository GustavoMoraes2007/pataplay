$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$bundledNode = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
if ($nodeCommand) { $nodeExecutable = $nodeCommand.Source }
elseif (Test-Path -LiteralPath $bundledNode) { $nodeExecutable = $bundledNode }
else { throw 'Instale o Node.js 24 com npm e execute npm install.' }
if (-not (Test-Path -LiteralPath 'node_modules/vite/bin/vite.js')) { throw 'Execute npm install antes de iniciar.' }
Write-Host 'PataPlay: abra http://127.0.0.1:5173 no navegador. Ctrl+C para encerrar.'
& $nodeExecutable 'node_modules/vite/bin/vite.js' --host 127.0.0.1 --port 5173 --strictPort

