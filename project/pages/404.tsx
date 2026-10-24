<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 - Not Found</title>
  <style>
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--background, #fff);
      color: var(--foreground, #1a1a1a);
      font-family: system-ui, sans-serif;
      margin: 0;
    }
    .error-container {
      text-align: center;
      padding: 2rem;
    }
    .error-code {
      font-size: 10rem;
      font-weight: bold;
      color: #e5e5e5;
      line-height: 1;
      margin-bottom: 1rem;
    }
    .error-title {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .error-description {
      color: #6b7280;
      margin-bottom: 2rem;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    .link {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }
    .link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="error-container">
    <div class="error-code">404</div>
    <div class="error-title">Page Not Found</div>
    <p class="error-description">
      The page you're looking for doesn't exist. Please check the URL or go back home.
    </p>
    <a class="link" href="/">Go Home</a>
  </div>
</body>
</html>
