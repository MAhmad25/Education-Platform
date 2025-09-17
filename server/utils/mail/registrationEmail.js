const registrationEmail = (otp) => {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - DevAcademy</title>
    <style>
        /* Import Google Fonts for modern typography */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background-color: #f7fafc;
            padding: 20px 0;
        }
        
        /* Main email container - adjust max-width here */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        /* Header section with gradient background - CHANGE COLORS HERE */
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); /* Blue gradient - customize this */
            padding: 40px 40px 60px;
            text-align: center;
            position: relative;
        }
        
        /* Header arrow decoration - matches header gradient */
        .header::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 20px solid #1d4ed8; /* Match header gradient end color */
        }
        
        /* Company logo/name styling */
        .logo {
            color: white;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
            letter-spacing: -0.5px;
        }
        
        /* Header subtitle text */
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            font-weight: 400;
        }
        
        /* Main content area */
        .content {
            padding: 60px 40px 40px;
            text-align: center;
        }
        
        /* Welcome icon circle - CHANGE COLORS HERE */
        .welcome-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); /* Match header gradient */
            border-radius: 50%;
            margin: 0 auto 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
        }
        
        /* Main heading text */
        .main-heading {
            font-size: 28px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 16px;
            line-height: 1.3;
        }
        
        /* Main description text */
        .main-text {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 32px;
            line-height: 1.6;
        }
        
        /* OTP code display container */
        .otp-container {
            background-color: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            position: relative;
        }
        
        .otp-label {
            font-size: 14px;
            color: #4a5568;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        /* OTP code styling - CUSTOMIZE APPEARANCE HERE */
        .otp-code {
            font-size: 32px;
            font-weight: 700;
            color: #1d4ed8; /* Match your brand color */
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            margin-bottom: 16px;
            padding: 12px;
            background-color: white;
            border-radius: 8px;
            border: 1px solid #cbd5e0;
        }
        
        /* Copy button styling - CHANGE COLORS HERE */
        .copy-button {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); /* Match brand colors */
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .copy-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        /* Instructions text */
        .instructions {
            font-size: 14px;
            color: #718096;
            margin-bottom: 32px;
            line-height: 1.5;
        }
        
        /* Help section container */
        .help-section {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 32px;
        }
        
        .help-title {
            font-size: 16px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 8px;
        }
        
        .help-text {
            font-size: 14px;
            color: #4a5568;
            margin-bottom: 16px;
        }
        
        /* Help link styling - CHANGE COLOR HERE */
        .help-link {
            color: #3b82f6; /* Match brand color */
            text-decoration: none;
            font-weight: 500;
        }
        
        .help-link:hover {
            text-decoration: underline;
        }
        
        /* Footer section */
        .footer {
            background-color: #f8fafc;
            padding: 32px 40px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-text {
            font-size: 13px;
            color: #718096;
            margin-bottom: 16px;
        }
        
        /* Social media links container */
        .social-links {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-bottom: 16px;
        }
        
        /* Individual social link styling - CHANGE HOVER COLOR HERE */
        .social-link {
            width: 36px;
            height: 36px;
            background-color: #e2e8f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: #4a5568;
            transition: all 0.3s ease;
        }
        
        .social-link:hover {
            background-color: #3b82f6; /* Match brand color */
            color: white;
        }
        
        /* Unsubscribe links */
        .unsubscribe {
            font-size: 12px;
            color: #a0aec0;
        }
        
        .unsubscribe a {
            color: #3b82f6; /* Match brand color */
            text-decoration: none;
        }
        
        /* Mobile responsive styles - ADJUST BREAKPOINTS HERE */
        @media (max-width: 640px) {
            .email-container {
                margin: 0 16px;
            }
            
            .header, .content, .footer {
                padding-left: 24px;
                padding-right: 24px;
            }
            
            .main-heading {
                font-size: 24px;
            }
            
            .otp-code {
                font-size: 28px;
                letter-spacing: 6px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header Section - Company branding -->
        <div class="header">
            <div class="logo">DevAcademy</div> <!-- CHANGE COMPANY NAME HERE -->
            <div class="header-subtitle">Learn. Code. Build. Deploy.</div> <!-- CHANGE TAGLINE HERE -->
        </div>
        
        <!-- Main Content Section -->
        <div class="content">
            <!-- Welcome icon -->
            <div class="welcome-icon">
                🔐 <!-- CHANGE ICON HERE -->
            </div>
            
            <!-- Main heading -->
            <h1 class="main-heading">Verify your email address</h1>
            
            <!-- Description text -->
            <p class="main-text">
                Thanks for signing up for DevAcademy! To complete your registration and start your coding journey, please enter the verification code below in the app.
            </p>
            
            <!-- OTP Code Display Section -->
            <div class="otp-container">
                <div class="otp-label">Your verification code:</div>
                <div class="otp-code" id="otpCode">${otp}</div> <!-- CHANGE OTP CODE HERE -->
                <button class="copy-button" onclick="copyOTP()">Copy Code</button>
            </div>
            
            <!-- Instructions -->
            <p class="instructions">
                This code will expire in <strong>5 minutes</strong>. If you didn't request this code, please ignore this email or contact our support team.
            </p>
            
            <!-- Help section -->
            <div class="help-section">
                <div class="help-title">Need help?</div>
                <div class="help-text">
                    If you didn't create a DevAcademy account or have any questions, please contact our support team.
                </div>
                <a href="#" class="help-link">Contact Support →</a> <!-- CHANGE SUPPORT LINK HERE -->
            </div>
        </div>
        
        <!-- Footer Section -->
        <div class="footer">
            <!-- Company information - CHANGE COMPANY DETAILS HERE -->
            <p class="footer-text">
                This email was sent to you because you signed up for a DevAcademy account.<br>
                DevAcademy Inc, 123 Tech Street, Silicon Valley, CA 94000, USA
            </p>
            
            <!-- Social media links - ADD YOUR SOCIAL LINKS HERE -->
            <div class="social-links">
                <a href="#" class="social-link">📘</a> <!-- Facebook -->
                <a href="#" class="social-link">🐦</a> <!-- Twitter -->
                <a href="#" class="social-link">📷</a> <!-- Instagram -->
                <a href="#" class="social-link">💼</a> <!-- LinkedIn -->
            </div>
            
            <!-- Legal links - CHANGE LINKS HERE -->
            <div class="unsubscribe">
                <a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
            </div>
        </div>
    </div>

    <!-- JavaScript for copy functionality -->
    <script>
        // Copy OTP code to clipboard function with fallback support
        function copyOTP() {
            const otpCode = document.getElementById('otpCode').textContent;
            const button = document.querySelector('.copy-button');
            const originalText = button.textContent;
            
            // Modern clipboard API (preferred method)
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(otpCode).then(function() {
                    showCopySuccess(button, originalText);
                }).catch(function(err) {
                    // Fallback if clipboard API fails
                    fallbackCopyTextToClipboard(otpCode, button, originalText);
                });
            } else {
                // Fallback for older browsers or non-secure contexts
                fallbackCopyTextToClipboard(otpCode, button, originalText);
            }
        }
        
        // Fallback copy method for older browsers
        function fallbackCopyTextToClipboard(text, button, originalText) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            
            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showCopySuccess(button, originalText);
                } else {
                    showCopyError(button, originalText);
                }
            } catch (err) {
                showCopyError(button, originalText);
            }
            
            document.body.removeChild(textArea);
        }
        
        // Show success feedback
        function showCopySuccess(button, originalText) {
            button.textContent = 'Copied!';
            button.style.background = '#10b981'; // Success green color
            
            // Reset button after 2 seconds
            setTimeout(function() {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
            }, 2000);
        }
        
        // Show error feedback
        function showCopyError(button, originalText) {
            button.textContent = 'Copy Failed';
            button.style.background = '#ef4444'; // Error red color
            
            // Reset button after 2 seconds
            setTimeout(function() {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
            }, 2000);
        }
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'980a8becc02190aa',t:'MTc1ODEzMjQ4My4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
`;
};
