$path = "e:\Visitor Management System\My Projects\Wordpress\PV Website"
Get-ChildItem -Path $path -Recurse -Include *.tsx,*.ts -Exclude node_modules,.next | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content -LiteralPath $filePath -Raw
    
    # Backgrounds
    $content = $content -replace 'bg-\[#070709\]', 'bg-primary'
    $content = $content -replace 'bg-\[#050608\]', 'bg-primary'
    $content = $content -replace 'bg-\[#0E1016\]', 'bg-surface'
    $content = $content -replace 'bg-\[#0F1116\]', 'bg-surface'
    $content = $content -replace 'bg-\[#12141D\]', 'bg-surface'
    $content = $content -replace 'bg-\[#12141C\]', 'bg-surface'
    $content = $content -replace 'bg-\[#1A1D28\]', 'bg-surface'
    $content = $content -replace 'bg-\[#F5C518\]', 'bg-accent'
    $content = $content -replace 'bg-\[#FFD94D\]', 'bg-accent'
    $content = $content -replace 'bg-\[#FFDE59\]', 'bg-accent'
    $content = $content -replace 'bg-\[#E5B208\]', 'bg-accent'
    $content = $content -replace 'bg-\[#D4A508\]', 'bg-accent'
    $content = $content -replace 'bg-white', 'bg-text-main'
    
    # Texts
    $content = $content -replace 'text-\[#F5C518\]', 'text-accent'
    $content = $content -replace 'text-\[#8E94A4\]', 'text-text-muted'
    $content = $content -replace 'text-\[#9BA1B2\]', 'text-text-muted'
    $content = $content -replace 'text-\[#5C6274\]', 'text-text-muted'
    $content = $content -replace 'text-\[#F8F9FA\]', 'text-text-main'
    $content = $content -replace 'text-\[#E2E4E9\]', 'text-text-main'
    $content = $content -replace 'text-white', 'text-text-main'
    
    # Borders
    $content = $content -replace 'border-\[#F5C518\]', 'border-accent'
    $content = $content -replace 'border-white', 'border-text-main'
    
    # Other specifics
    $content = $content -replace 'via-\[#F5C518\]', 'via-accent'
    $content = $content -replace 'from-\[#F5C518\]', 'from-accent'
    $content = $content -replace 'to-\[#D4A508\]', 'to-accent'
    $content = $content -replace 'to-\[#E5B208\]', 'to-accent'
    $content = $content -replace 'shadow-\[0_2px_20px_rgba\(245,197,24,0\.22\)\]', 'shadow-md'
    $content = $content -replace 'shadow-\[0_4px_30px_rgba\(245,197,24,0\.38\)\]', 'shadow-lg'
    $content = $content -replace 'shadow-\[0_0_15px_rgba\(245,197,24,0\.3\)\]', 'shadow-lg'
    $content = $content -replace 'shadow-\[0_0_25px_rgba\(245,197,24,0\.25\)\]', 'shadow-lg'
    
    $original = Get-Content -LiteralPath $filePath -Raw
    if ($original -ne $content) {
        [IO.File]::WriteAllText($filePath, $content)
    }
}
