# Script to clean code formatting and run linting

Write-Host "→" -ForegroundColor Blue -NoNewline
Write-Host " Running Prettier..."
Write-Host ""
npx prettier --write "src/**/*.{ts,tsx}" "*.{js,mjs,json}"
Write-Host ""
Write-Host "✓" -ForegroundColor Green -NoNewline
Write-Host " Prettier completed"

Write-Host ""
Write-Host "→" -ForegroundColor Blue -NoNewline
Write-Host " Running linter..."
npm run lint -- --fix
Write-Host "✓" -ForegroundColor Green -NoNewline
Write-Host " Linting completed"

Write-Host ""
Write-Host "→" -ForegroundColor Blue -NoNewline
Write-Host " Cleaning trailing newlines..."

$hasChanges = $false
$extensions = @("*.ts", "*.tsx", "*.js", "*.jsx", "*.mjs", "*.mts", "*.md")
$excludeDirs = @("node_modules", ".next", "out", "ashes")

$files = Get-ChildItem -Recurse -File -Include $extensions | Where-Object {
    $path = $_.FullName
    -not ($excludeDirs | Where-Object { $path -like "*\$_\*" })
}

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $cleaned = $content.TrimEnd("`r", "`n")
    if ($content -ne $cleaned) {
        [System.IO.File]::WriteAllText($file.FullName, $cleaned)
        Write-Host "✓" -ForegroundColor Green -NoNewline
        Write-Host " Cleaned: $($file.FullName)"
        $hasChanges = $true
    }
}

if (-not $hasChanges) {
    Write-Host " ○" -ForegroundColor Yellow -NoNewline
    Write-Host " No changes needed"
    Write-Host ""
}

Write-Host "✓" -ForegroundColor Green -NoNewline
Write-Host " Code cleaning completed!"