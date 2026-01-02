# pranav is typing...

A minimalist, Medium-style blog platform built with React, Vite, and Tailwind CSS concepts.

## Features
- **Minimalist Design**: Clean typography and whitespace-focused layout.
- **Secure by Default**: 
  - CSP and security headers via `vercel.json`
  - Input handling stability
  - Simulated Authentication ("User Manipulation Prevention")
  - Safe Link navigation for external URLs
- **CD Pipeline**: Automated testing and build workflow via GitHub Actions.

## Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```

3. **run Tests**
   ```bash
   npm test
   ```

## Deployment & Security

This project is configured for continuous deployment with robust security headers.

### 1. Continuous Deployment
The repository includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that:
- Runs linting and tests on every push.
- Builds the project for production.
- Can be configured to deploy automatically to Vercel/Netlify/GitHub Pages.

To enable auto-deploy, configure your hosting provider secrets (e.g., `VERCEL_TOKEN`) in the GitHub Repository Settings > Secrets and update the workflow file.

### 2. Security Configuration
Security headers are enforced using `vercel.json`. This ensures:
- **Content Security Policy (CSP)**: RESTRICTS sources of scripts, styles, and images to prevent XSS.
- **HSTS**: Enforces HTTPS connections.
- **X-Frame-Options**: Prevents clickjacking.

**Verification**:
After deployment, inspect the HTTP headers in your browser's DevTools (Network tab) to confirm `Strict-Transport-Security` and `Content-Security-Policy` are present.

### 3. Environment Variables
Copy `.env.example` to `.env` locally:
```bash
cp .env.example .env
```
Manage environment-specific secrets (like API keys or Auth IDs) here. never commit `.env` to version control.

### 4. Authentication
The app currently uses a simulated AuthContext (`src/components/AuthContext.jsx`). For production:
1. Replace the mock logic with a real provider SDK (Auth0, Firebase, etc.).
2. Use `VITE_AUTH_CLIENT_ID` from environment variables.
