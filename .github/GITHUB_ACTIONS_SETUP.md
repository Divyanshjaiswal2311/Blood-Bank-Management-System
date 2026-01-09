# GitHub Actions CI/CD Setup Guide

This document explains how to set up and configure GitHub Actions for the Blood Bank Management System.

## Overview

The project includes three GitHub Actions workflows:

1. **CI Pipeline** (`ci.yml`) - Runs on every push and pull request
2. **CD Pipeline** (`cd.yml`) - Deploys to production on main branch
3. **Code Quality** (`code-quality.yml`) - Security and code analysis

## Prerequisites

- GitHub repository (public or private)
- Netlify account (for frontend deployment)
- Render account (for backend deployment)
- Optional: Slack workspace, SonarCloud, Snyk accounts

## Setup Instructions

### 1. GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

#### Frontend Deployment (Netlify)
```
NETLIFY_AUTH_TOKEN    - Your Netlify personal access token
NETLIFY_SITE_ID       - Your Netlify site ID
```

**How to get Netlify credentials:**
1. Go to https://app.netlify.com
2. User settings → Applications → Personal access tokens
3. Create a new token and copy it
4. Go to your site → Site settings → General → Site ID

#### Backend Deployment (Render)
```
RENDER_SERVICE_ID     - Your Render service ID
RENDER_API_KEY        - Your Render API key
RENDER_WEBHOOK_URL    - Deploy webhook URL (optional)
```

**How to get Render credentials:**
1. Go to https://dashboard.render.com
2. Go to Account → API Tokens
3. Create an API token
4. Find your service ID in the service URL

#### Optional: Notifications
```
SLACK_WEBHOOK_URL     - Slack incoming webhook for notifications
SONAR_TOKEN           - SonarCloud token for code analysis
SNYK_TOKEN            - Snyk token for security scanning
```

### 2. Update Environment Variables

Create/update `.env` file in the root directory:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=8080
REACT_APP_API_URL=https://your-backend-url.com
```

Create/update `client/.env` for frontend:
```
REACT_APP_API_URL=https://your-backend-url.com
```

### 3. Configure Netlify (Optional but Recommended)

If you want automatic deployments to Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `client/build`
4. Add environment variables in Netlify UI

### 4. Configure Render (Optional but Recommended)

If you want automatic deployments to Render:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set start command: `npm install && npm start`
4. Add environment variables
5. Deploy hook is optional (can be added later)

## Workflow Details

### CI Pipeline (ci.yml)
**Triggers:** Push to main/develop, Pull requests

**Jobs:**
- **lint-and-test-backend**: Tests Node.js 18.x and 20.x
  - Installs dependencies
  - Runs linting (if configured)
  - Runs tests
  - Checks syntax

- **lint-and-test-frontend**: Tests React builds
  - Installs frontend dependencies
  - Runs linting and tests
  - Builds the production bundle
  - Uploads build artifacts

- **security-check**: npm audit for dependencies
  - Checks for vulnerability advisories

- **docker-build**: Builds Docker images (on main branch only)
  - Tests Docker builds for both frontend and backend

### CD Pipeline (cd.yml)
**Triggers:** Push to main branch

**Jobs:**
- **deploy-frontend**: Deploys to Netlify
- **deploy-backend**: Deploys to Render
- **notify-deployment**: Sends Slack notifications

### Code Quality (code-quality.yml)
**Triggers:** Push to main/develop, Pull requests

**Jobs:**
- **code-quality**: SonarCloud and Snyk analysis
- **code-coverage**: Test coverage reports

## Adding Tests

To enable automated testing, add test scripts to package.json:

### Backend (package.json)
```json
"test": "jest --detectOpenHandles",
"test:watch": "jest --watch"
```

### Frontend (client/package.json)
```json
"test": "react-scripts test",
"test:coverage": "react-scripts test --coverage --watchAll=false"
```

## Monitoring Workflows

1. Go to your GitHub repository
2. Click "Actions" tab
3. View workflow runs and logs
4. Click on a run to see detailed output

## Customization

### To disable specific jobs:
Edit the workflow file and add `if: false` to any job

### To change deployment branches:
Edit the `on:` section in `ci.yml` and `cd.yml`

### To add more quality checks:
Add additional actions from GitHub Marketplace

## Troubleshooting

### Build fails on missing dependencies
- Run `npm install` and `npm install --prefix client` locally
- Commit `package-lock.json` files

### Deployment fails
- Check secret names in GitHub (case-sensitive)
- Verify tokens are valid and not expired
- Check build logs in Actions tab

### Tests not running
- Ensure test commands are configured in package.json
- Use `--watchAll=false` for CI environments

## Best Practices

1. **Keep secrets safe**: Never commit `.env` files
2. **Use branch protection**: Require status checks before merging
3. **Monitor workflows**: Check Actions tab regularly
4. **Update dependencies**: Keep actions updated
5. **Document changes**: Add comments to workflow files
6. **Test locally first**: Run `npm test` before pushing

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Netlify GitHub Integration](https://docs.netlify.com/configure-builds/repo-permissions-linking/)
- [Render GitHub Integration](https://render.com/docs/github)
- [Node.js Testing Best Practices](https://nodejs.org/en/docs/guides/testing/)
