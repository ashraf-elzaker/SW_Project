# Continuous Delivery Setup Guide for Azure

## Overview
This project is configured for Continuous Delivery (CD) with:
- **Frontend**: React/Vite deployed to Azure App Service or Azure Static Web Apps
- **Backend**: Django REST API deployed to Azure App Service  
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Environments**: Staging and Production

## Prerequisites

1. **GitHub Account** - with repository set up
2. **Azure Account** - with subscription
3. **GitHub Secrets** - configured (see below)

## Setup Instructions

### 1. Create Azure Resources

#### Backend (Django)
```bash
# Create resource group
az group create --name sw-project-rg --location eastus

# Create App Service Plan
az appservice plan create --name sw-project-plan \
  --resource-group sw-project-rg \
  --sku B1 --is-linux

# Create Backend App Service
az webapp create --resource-group sw-project-rg \
  --plan sw-project-plan \
  --name sw-project-api-staging \
  --runtime "PYTHON|3.11"

az webapp create --resource-group sw-project-rg \
  --plan sw-project-plan \
  --name sw-project-api-prod \
  --runtime "PYTHON|3.11"
```

#### Frontend (React)
```bash
# Create Static Web App (Optional - for frontend only)
az staticwebapp create --name sw-project-ui \
  --resource-group sw-project-rg \
  --location eastus

# OR use App Service for frontend as well
az webapp create --resource-group sw-project-rg \
  --plan sw-project-plan \
  --name sw-project-ui-staging

az webapp create --resource-group sw-project-rg \
  --plan sw-project-plan \
  --name sw-project-ui-prod
```

### 2. Configure GitHub Secrets

Go to: Settings → Secrets and variables → Actions

Add these secrets:

**For Staging:**
```
AZURE_APP_NAME_STAGING=sw-project-api-staging
AZURE_PUBLISH_PROFILE_STAGING=<paste publish profile XML>
AZURE_FRONTEND_STAGING=sw-project-ui-staging
```

**For Production:**
```
AZURE_APP_NAME_PRODUCTION=sw-project-api-prod
AZURE_PUBLISH_PROFILE_PRODUCTION=<paste publish profile XML>
AZURE_FRONTEND_PRODUCTION=sw-project-ui-prod
PRODUCTION_URL=https://your-production-url.azurewebsites.net
```

#### How to get Publish Profile:

1. Go to Azure Portal
2. Select your App Service
3. Click "Download publish profile" (top right)
4. Open the downloaded XML file with a text editor
5. Copy entire content and paste into GitHub secret

### 3. Deploy Database

#### For PostgreSQL on Azure:

```bash
# Create PostgreSQL Server
az postgres server create \
  --resource-group sw-project-rg \
  --name sw-project-db \
  --location eastus \
  --admin-user dbadmin \
  --admin-password <secure-password>

# Create database
az postgres db create \
  --resource-group sw-project-rg \
  --server-name sw-project-db \
  --name sw_project

# Configure firewall to allow Azure services
az postgres server firewall-rule create \
  --resource-group sw-project-rg \
  --server-name sw-project-db \
  --name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

### 4. Configure App Settings in Azure

For each App Service, go to Configuration → Application settings:

**Backend App Service Settings:**
```
DEBUG=False
ENVIRONMENT=<staging|production>
SECRET_KEY=<generate-secure-key>
DATABASE_URL=postgresql://user:password@host:5432/dbname
ALLOWED_HOSTS=your-app.azurewebsites.net
CORS_ALLOWED_ORIGINS=https://your-frontend-url.azurewebsites.net
JWT_SECRET=<generate-secure-key>
```

**Frontend App Service Settings:**
```
VITE_API_URL=https://your-backend-api.azurewebsites.net
NODE_ENV=production
```

### 5. First Deployment

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial CD setup"
git push origin develop  # This deploys to staging
```

2. **Monitor GitHub Actions:**
   - Go to your repository
   - Click "Actions" tab
   - Monitor the deployment workflow

3. **Verify Deployment:**
   - Frontend: https://your-app.azurewebsites.net
   - Backend API: https://your-api.azurewebsites.net/admin

### 6. Branch Strategy

- **`develop` branch** → Deploys to **Staging**
- **`main` branch** → Deploys to **Production**

```bash
# For development
git checkout -b feature/your-feature develop
# Make changes
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
# Create Pull Request to develop

# For production release
# Create Pull Request from develop → main
# After merge, it auto-deploys to production
```

## Local Testing

### Test with Docker:
```bash
# Build and run locally
docker-compose up -d

# Access:
# Frontend: http://localhost
# Backend: http://localhost:8000/admin
```

### Database Migrations:
```bash
cd The_project_back
python manage.py makemigrations
python manage.py migrate
```

## Monitoring & Logs

### View Logs in Azure:
```bash
# Backend logs
az webapp log tail --resource-group sw-project-rg --name sw-project-api-prod

# Real-time streaming
az webapp log tail --resource-group sw-project-rg --name sw-project-api-prod --follow
```

### Application Insights (Optional):
Set up in Azure Portal for advanced monitoring:
```bash
az monitor app-insights component create \
  --resource-group sw-project-rg \
  --app sw-project-insights
```

## Rollback

If deployment fails:
```bash
# Go to App Service → Deployment slots or Deployment Center
# Click on previous successful deployment
# Click "Swap" to rollback
```

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS only in Azure
- [ ] Enable authentication (Azure AD, GitHub, etc.)
- [ ] Set up firewall rules
- [ ] Configure CORS properly
- [ ] Use managed identities for Azure services
- [ ] Enable Azure Key Vault for secrets
- [ ] Set up regular backups
- [ ] Enable monitoring and alerts

## Troubleshooting

### App won't start
```bash
# Check logs
az webapp log tail --resource-group sw-project-rg --name your-app-name

# Check configuration
az webapp config show --resource-group sw-project-rg --name your-app-name
```

### Database connection issues
```bash
# Test connection string
psql -h host.postgres.database.azure.com -U user@server -d dbname
```

### Static files not loading
```bash
# Collect static files again
cd The_project_back
python manage.py collectstatic --noinput
```

## Cost Optimization

- Use **B1 (Free first month)** tier for testing
- Use **B2** tier for production
- Consider **Azure Database for PostgreSQL flexible server** for better pricing
- Enable **auto-shutdown** for non-production environments

## Next Steps

1. Set up monitoring and alerts
2. Configure custom domain
3. Set up SSL/TLS certificate (auto with Azure)
4. Configure CDN for frontend
5. Set up backup strategy
6. Plan scaling strategy

For more help: https://docs.microsoft.com/en-us/azure/app-service/
