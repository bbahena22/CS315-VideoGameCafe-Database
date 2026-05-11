# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Prerequisites
- Your repository is pushed to GitHub
- You have a GitHub account with write access

### Setup Instructions

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to **Pages** section
   - Under "Build and deployment", select:
     - Source: **GitHub Actions**
   - This allows the workflow to deploy automatically

2. **How Deployment Works**
   - Every push to `main` or `master` branch triggers the workflow
   - The workflow:
     - Installs dependencies (`npm ci`)
     - Builds the project (`npm run build`)
     - Deploys the `dist/` folder to GitHub Pages

3. **View Your Deployment**
   - After a successful build, your site will be available at:
     ```
     https://bbahena22.github.io/CS315-VideoGameCafe-Database/
     ```
   - Check the "Deployments" tab in your repository to see deployment history

### Local Testing

To test the build locally before pushing:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the build
npm run preview
```

### Troubleshooting

- **Deployment failed**: Check the "Actions" tab in your repository to see workflow logs
- **Page not loading**: Ensure GitHub Pages is enabled in repository settings
- **Incorrect styling/assets**: The base path is set to `/CS315-VideoGameCafe-Database/` in `vite.config.js`

### Server API

If you need to run the backend server locally:

```bash
npm run api
```

This starts the Express server on the configured port.

### Notes

- The frontend is deployed to GitHub Pages
- The backend server needs to be deployed separately (to a platform like Railway, Heroku, AWS, etc.)
- Update API endpoints in your React components to point to your deployed backend server
