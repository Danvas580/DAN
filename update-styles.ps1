# Common head content to be added to all HTML files
$commonHead = @"
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- AOS Animation -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
"@

# Common scripts to be added before </body>
$commonScripts = @"
    <!-- AOS Animation -->
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize AOS
            AOS.init({
                duration: 800,
                once: true,
                disable: window.innerWidth < 768
            });

            // Hide loading animation
            setTimeout(() => {
                document.querySelector('.loading-animation').classList.add('loaded');
            }, 1000);

            // Header scroll effect
            const header = document.querySelector('header');
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > lastScroll && currentScroll > 80) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
            });

            // Mobile menu toggle
            const mobileMenu = document.querySelector('.mobile-menu');
            const navLinks = document.querySelector('.nav-links');
            
            mobileMenu?.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        });
    </script>
"@

# Loading animation HTML
$loadingAnimation = @"
    <!-- Loading Animation -->
    <div class="loading-animation">
        <div class="loading-logo"></div>
    </div>
"@

# PowerShell script to update HTML files
$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Check if style.css is already included
    if (-not ($content -match '<link.*href="style.css".*>')) {
        $styleLink = '    <link rel="stylesheet" href="style.css" />'
        $content = $content -replace '(</head>)', "$styleLink`n`$1"
    }
    
    # Check if update-styles.js is already included
    if (-not ($content -match '<script.*src="update-styles.js".*>')) {
        $scriptTag = '    <script src="update-styles.js"></script>'
        $content = $content -replace '(</body>)', "$scriptTag`n`$1"
    }
    
    # Add performance class to body if not present
    if (-not ($content -match 'class=".*performance-mode.*"')) {
        $content = $content -replace '<body([^>]*)>', '<body$1 class="performance-mode">'
    }
    
    # Save the changes
    $content | Set-Content $file.FullName -Force
}

Write-Host "Updated all HTML files with consistent styling" 