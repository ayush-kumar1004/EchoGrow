$ErrorActionPreference = 'Stop'

Write-Host "Creating Next.js app in temp directory..."
cd F:\
npx -y create-next-app@latest temp-echo-grow --typescript --eslint --app --src-dir --import-alias "@/*" --use-npm --yes --no-tailwind

Write-Host "Moving files to F:\EchoGrow..."
Copy-Item -Path "F:\temp-echo-grow\*" -Destination "F:\EchoGrow\" -Recurse -Force
# Copy dotfiles explicitly (like .eslintrc, .gitignore, etc)
Get-ChildItem -Path "F:\temp-echo-grow" -Force | Where-Object { $_.Name -match "^\." } | Copy-Item -Destination "F:\EchoGrow\" -Recurse -Force

Write-Host "Cleaning up temp directory..."
Remove-Item -Path "F:\temp-echo-grow" -Recurse -Force

Write-Host "Creating scratch directory for HTML files..."
$scratchDir = "F:\EchoGrow\scratch"
if (-not (Test-Path $scratchDir)) {
    New-Item -ItemType Directory -Path $scratchDir | Out-Null
}

Write-Host "Downloading HTML files..."
$urls = @{
    "process.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjY0MTI4NGU4NTQwODlhZjVmZGMxM2Q3OGNiEgsSBxCF1qPMsB8YAZIBIwoKcHJvamVjdF9pZBIVQhMzMTYxMjU2MzkxOTE3NTY3Nzcx&filename=&opi=89354086"
    "contact.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjY1MGJhZjNjMzcwNjM5NzAxZThiMjJhODRmEgsSBxCF1qPMsB8YAZIBIwoKcHJvamVjdF9pZBIVQhMzMTYxMjU2MzkxOTE3NTY3Nzcx&filename=&opi=89354086"
    "pricing.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2EzNzc4NGEwNzM4YjQ5ZDJiYzRjMzJlNWQwODk5NTI0EgsSBxCF1qPMsB8YAZIBIwoKcHJvamVjdF9pZBIVQhMzMTYxMjU2MzkxOTE3NTY3Nzcx&filename=&opi=89354086"
    "services.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjYzZTdjYmJmZTIwNDczNTY4NmU5MjM0NmI5EgsSBxCF1qPMsB8YAZIBIwoKcHJvamVjdF9pZBIVQhMzMTYxMjU2MzkxOTE3NTY3Nzcx&filename=&opi=89354086"
    "portfolio.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjYzYjY5NGEyOGUwOTEwNzY0NTBiMWJkZjcxEgsSBxCF1qPMsB8YAZIBIwoKcHJvamVjdF9pZBIVQhMzMTYxMjU2MzkxOTE3NTY3Nzcx&filename=&opi=89354086"
    "home.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjYzZTcyZTQ5ODAwNTAzYzEwOTFmMzY1Njk5EgsSBxCF1qPMsB8YAZIBIwoKcHJvamVjdF9pZBIVQhMzMTYxMjU2MzkxOTE3NTY3Nzcx&filename=&opi=89354086"
    "about.html" = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1MjY0ZTBiMDNjNTEwOTI1ZDMxN2E2MWIzYTM1EgsSBxCF1qPMsB8YAZIBIwoKcHJvamVjdF9pZBIVQhMzMTYxMjU2MzkxOTE3NTY3Nzcx&filename=&opi=89354086"
}

foreach ($item in $urls.GetEnumerator()) {
    $outFile = Join-Path $scratchDir $item.Name
    Write-Host "Downloading $($item.Name)..."
    Invoke-WebRequest -Uri $item.Value -OutFile $outFile
}

Write-Host "Setup complete!"
