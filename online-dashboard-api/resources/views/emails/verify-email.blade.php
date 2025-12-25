<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Email</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0; }
        .container { max-width: 640px; margin: 40px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); overflow: hidden; }
        .header { background: linear-gradient(90deg, #4f46e5, #0ea5e9); color: #fff; padding: 22px; text-align: center; }
        .content { padding: 28px; color: #374151; }
        .code-box { font-size: 28px; letter-spacing: 6px; font-weight: bold; color: #111827; background: #f1f5f9; padding: 14px 20px; border-radius: 10px; display: inline-block; margin: 12px 0; }
        .btn { display: inline-block; padding: 14px 26px; background: #0ea5e9; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; }
        .btn:hover { background: #0284c7; }
        .footer { padding: 18px; text-align: center; font-size: 12px; color: #6b7280; background: #f8fafc; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verify your email</h1>
        </div>
        <div class="content">
            <p>Hello <strong>{{ $name }}</strong>,</p>
            <p>Enter the code below to verify your email and finish signing in.</p>
            <div class="code-box">{{ $code }}</div>
            <p>Or click the magic link to jump right in:</p>
            <p><a class="btn" href="{{ $verificationLink }}">Verify & Sign In</a></p>
            <p style="font-size: 13px; color: #6b7280; margin-top: 18px;">If you did not sign up for this account, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} BTech Career Guide. All rights reserved.
        </div>
    </div>
</body>
</html>
