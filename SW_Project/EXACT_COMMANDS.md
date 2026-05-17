# ⚡ EXACT TERMINAL COMMANDS - Step by Step

## Prerequisites
- Azure account (free tier is fine)
- GitHub account
- Azure CLI installed (`https://docs.microsoft.com/cli/azure/install-azure-cli`)
- Git installed (comes with most systems)

---

## PHASE 1: LOCAL SETUP (Run These Commands Now)

### Step 1: Navigate to Project
```powershell
cd "C:\Users\pc\Downloads\SW_Project\SW_Project"
```

### Step 2: Initialize Git Repository
```powershell
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"

git init
git add .
git commit -m "Initial commit: Add CD configuration"
```

**Expected output:**
```
[main (root-commit) xxx] Initial commit: Add CD configuration
 XX files changed, XXX insertions(+)
```

### Step 3: Create Local Branch Strategy
```powershell
git branch develop
git checkout develop
```

**Check current branch:**
```powershell
git branch
```

**Expected output:**
```
  develop
* main
```

---

## PHASE 2: GITHUB SETUP (Manual Steps on GitHub Website)

### Step 1: Create GitHub Repository
1. Go to **https://github.com/new**
2. Repository name: `SW_Project`
3. Description: "Web marketplace project"
4. Select **Public** or **Private**
5. Click **Create repository**

### Step 2: Add GitHub Remote and Push Code

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/SW_Project.git
git branch -M main
git push -u origin main

# Push develop branch
git checkout develop
git push -u origin develop

# Switch back to main
git checkout main
```

**Expected output:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
To https://github.com/YOUR_USERNAME/SW_Project.git
 * [new branch]      main -> main
 * [new branch]      develop -> develop
```

### Step 3: Verify on GitHub
- Go to your repository: `https://github.com/YOUR_USERNAME/SW_Project`
- Verify you see both `main` and `develop` branches

---

## PHASE 3: AZURE SETUP (Run in PowerShell)

### Step 1: Login to Azure
```powershell
az login
```

This opens a browser for authentication. Log in with your Azure credentials.

### Step 2: Create Resource Group
```powershell
az group create `
  --name sw-project-rg `
  --location eastus
```

### Step 3: Create App Service Plan
```powershell
az appservice plan create `
  --name sw-project-plan `
  --resource-group sw-project-rg `
  --sku B1 `
  --is-linux
```

### Step 4: Create Staging App Service
```powershell
az webapp create `
  --resource-group sw-project-rg `
  --plan sw-project-plan `
  --name sw-project-api-staging `
  --runtime "PYTHON|3.11"

# Configure for Python
az webapp config set `
  --resource-group sw-project-rg `
  --name sw-project-api-staging `
  --startup-file "startup.sh"
```

### Step 5: Create Production App Service
```powershell
az webapp create `
  --resource-group sw-project-rg `
  --plan sw-project-plan `
  --name sw-project-api-prod `
  --runtime "PYTHON|3.11"

# Configure for Python
az webapp config set `
  --resource-group sw-project-rg `
  --name sw-project-api-prod `
  --startup-file "startup.sh"
```

### Step 6: Create PostgreSQL Database
```powershell
# Create server
az postgres server create `
  --resource-group sw-project-rg `
  --name sw-project-db `
  --location eastus `
  --admin-user dbadmin `
  --admin-password "SecurePassword123!@#" `
  --sku-name B_Gen5_1

# Create database
az postgres db create `
  --resource-group sw-project-rg `
  --server-name sw-project-db `
  --name sw_project

# Allow Azure services to connect
az postgres server firewall-rule create `
  --resource-group sw-project-rg `
  --server-name sw-project-db `
  --name AllowAzureServices `
  --start-ip-address 0.0.0.0 `
  --end-ip-address 0.0.0.0
```

### Step 7: Get Database Connection String
```powershell
# Save this for later
$dbConnectionString = "postgresql://dbadmin:SecurePassword123!@#@sw-project-db.postgres.database.azure.com:5432/sw_project"
echo $dbConnectionString
```

---

## PHASE 4: GET PUBLISH PROFILES (Manual - Use Azure Portal)

### For Staging App Service:

1. Go to **Azure Portal**: https://portal.azure.com
2. Search for **"App Services"**
3. Click **"sw-project-api-staging"**
4. Click **"Download publish profile"** (top right)
5. Open the downloaded XML file with Notepad
6. **Copy the entire XML content** (Ctrl+A, Ctrl+C)
7. **Save this in a safe place** - you'll paste it into GitHub

### For Production App Service:

1. Click **"sw-project-api-prod"**
2. Click **"Download publish profile"**
3. Open XML and **copy the entire content**
4. **Save this in a safe place**

---

## PHASE 5: ADD GITHUB SECRETS (Manual - GitHub Website)

### Go to GitHub Secrets:
1. Go to your repo: `https://github.com/YOUR_USERNAME/SW_Project`
2. Click **Settings** (top menu)
3. Click **Secrets and variables** (left menu)
4. Click **Actions**
5. Click **New repository secret**

### Add These 5 Secrets:

**Secret 1: AZURE_APP_NAME_STAGING**
- Name: `AZURE_APP_NAME_STAGING`
- Value: `sw-project-api-staging`
- Click **Add secret**

**Secret 2: AZURE_PUBLISH_PROFILE_STAGING**
- Name: `AZURE_PUBLISH_PROFILE_STAGING`
- Value: *Paste the entire XML from staging publish profile*
- Click **Add secret**

**Secret 3: AZURE_APP_NAME_PRODUCTION**
- Name: `AZURE_APP_NAME_PRODUCTION`
- Value: `sw-project-api-prod`
- Click **Add secret**

**Secret 4: AZURE_PUBLISH_PROFILE_PRODUCTION**
- Name: `AZURE_PUBLISH_PROFILE_PRODUCTION`
- Value: *Paste the entire XML from production publish profile*
- Click **Add secret**

**Secret 5: PRODUCTION_URL**
- Name: `PRODUCTION_URL`
- Value: `https://sw-project-api-prod.azurewebsites.net`
- Click **Add secret**

---

## PHASE 6: CONFIGURE AZURE APP SETTINGS

### For Staging App Service:

```powershell
az webapp config appsettings set `
  --resource-group sw-project-rg `
  --name sw-project-api-staging `
  --settings `
    DEBUG=False `
    ENVIRONMENT=staging `
    ALLOWED_HOSTS=sw-project-api-staging.azurewebsites.net `
    SECRET_KEY="your-staging-secret-key-change-this-to-random-string" `
    DATABASE_URL="postgresql://dbadmin:SecurePassword123!@#@sw-project-db.postgres.database.azure.com:5432/sw_project" `
    CORS_ALLOWED_ORIGINS="https://sw-project-ui-staging.azurewebsites.net" `
    JWT_SECRET="your-jwt-secret-key-change-this-to-random-string" `
    SCM_DO_BUILD_DURING_DEPLOYMENT=true `
    WEBSITES_ENABLE_APP_SERVICE_STORAGE=false
```

### For Production App Service:

```powershell
az webapp config appsettings set `
  --resource-group sw-project-rg `
  --name sw-project-api-prod `
  --settings `
    DEBUG=False `
    ENVIRONMENT=production `
    ALLOWED_HOSTS=sw-project-api-prod.azurewebsites.net `
    SECRET_KEY="your-production-secret-key-change-this-to-random-strong-string" `
    DATABASE_URL="postgresql://dbadmin:SecurePassword123!@#@sw-project-db.postgres.database.azure.com:5432/sw_project" `
    CORS_ALLOWED_ORIGINS="https://sw-project-ui-prod.azurewebsites.net" `
    JWT_SECRET="your-jwt-production-secret-key-change-this-to-random-string" `
    SECURE_SSL_REDIRECT=True `
    SESSION_COOKIE_SECURE=True `
    CSRF_COOKIE_SECURE=True `
    SCM_DO_BUILD_DURING_DEPLOYMENT=true `
    WEBSITES_ENABLE_APP_SERVICE_STORAGE=false
```

---

## PHASE 7: TEST DEPLOYMENT TO STAGING

### Step 1: Push to Develop Branch (Triggers Staging Deployment)

```powershell
cd "C:\Users\pc\Downloads\SW_Project\SW_Project"
git checkout develop
git add .
git commit -m "Test deployment to staging"
git push origin develop
```

### Step 2: Monitor GitHub Actions

1. Go to your GitHub repo
2. Click **Actions** (top menu)
3. You should see a workflow running
4. Click on it to see real-time progress
5. Wait for it to complete (usually 5-10 minutes)

### Step 3: Verify Staging Deployment

Once GitHub Actions says "Success":

```powershell
# Test the API
curl https://sw-project-api-staging.azurewebsites.net/admin/

# Or from PowerShell
Invoke-WebRequest -Uri "https://sw-project-api-staging.azurewebsites.net/admin/" -UseBasicParsing
```

**Expected result:** You should see a response (not a 404 error)

---

## PHASE 8: PRODUCTION DEPLOYMENT

Once staging works, deploy to production:

```powershell
git checkout main
git merge develop
git push origin main
```

**What happens automatically:**
1. GitHub Actions runs tests
2. GitHub Actions builds frontend and backend
3. GitHub Actions deploys to production
4. Database migrations run automatically
5. Your app is live!

### Monitor Production Deployment:

1. Go to GitHub → **Actions**
2. Watch the "Deploy to Azure" workflow
3. Wait for completion

### Verify Production:

```powershell
curl https://sw-project-api-prod.azurewebsites.net/admin/

# Or PowerShell
Invoke-WebRequest -Uri "https://sw-project-api-prod.azurewebsites.net/admin/" -UseBasicParsing
```

---

## PHASE 9: VIEW LOGS (Optional but Recommended)

### View Staging Logs:
```powershell
az webapp log tail `
  --resource-group sw-project-rg `
  --name sw-project-api-staging `
  --follow
```

### View Production Logs:
```powershell
az webapp log tail `
  --resource-group sw-project-rg `
  --name sw-project-api-prod `
  --follow
```

Press `Ctrl+C` to stop viewing logs.

---

## ✅ VERIFICATION CHECKLIST

After everything is complete:

- [ ] Git repository pushed to GitHub
- [ ] Both `main` and `develop` branches exist on GitHub
- [ ] 5 GitHub secrets are set
- [ ] Azure resources created (checked with `az resource list`)
- [ ] App settings configured for staging and production
- [ ] GitHub Actions ran successfully for staging
- [ ] Staging API responds at `https://sw-project-api-staging.azurewebsites.net/admin/`
- [ ] GitHub Actions ran successfully for production
- [ ] Production API responds at `https://sw-project-api-prod.azurewebsites.net/admin/`

---

## 🚀 FROM NOW ON - Development Workflow

### To add a new feature:
```powershell
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# Make your changes, then:
git add .
git commit -m "Add my feature"
git push origin feature/my-feature

# Create Pull Request on GitHub (in browser)
# After approval, merge to develop
```

### When feature is done and tested in staging:
```powershell
git checkout main
git pull origin main
git merge develop
git push origin main

# Production deploys automatically!
```

---

## ⚠️ IMPORTANT NOTES

1. **SECRET_KEY Values**: Change the placeholder values to random strings:
   ```powershell
   # Generate random string (run in PowerShell)
   [guid]::NewGuid().ToString()
   ```

2. **Database Password**: The password `SecurePassword123!@#` is just for this demo. Change it to something stronger in production.

3. **CORS_ALLOWED_ORIGINS**: Update these to your actual frontend URLs.

4. **First deployment takes longer** (10-15 min) because Azure installs dependencies. Subsequent deployments are faster (2-5 min).

5. **GitHub Actions limits**: Free tier allows unlimited runs, but there are concurrent job limits. That's fine for a single project.

---

## 🆘 If Something Goes Wrong

### Check logs:
```powershell
# Azure logs
az webapp log tail -g sw-project-rg -n sw-project-api-staging

# GitHub Actions - go to Actions tab and click on failed workflow
```

### Common errors:
- **"Module not found"** → Missing Python package
- **"Database connection failed"** → Check DATABASE_URL in app settings
- **"Static files 404"** → Run: `python manage.py collectstatic --noinput`
- **"CORS error"** → Update CORS_ALLOWED_ORIGINS in app settings

### Reset everything and try again:
```powershell
# Delete and recreate resource group (careful!)
az group delete --name sw-project-rg --yes
# Then restart from PHASE 3
```

---

## 📞 NEXT STEPS

Once both staging and production are working:

1. ✅ Set up custom domain (optional)
2. ✅ Configure monitoring/alerts
3. ✅ Set up backup strategy
4. ✅ Add team members
5. ✅ Create CI/CD improvements

See `DEPLOYMENT_GUIDE.md` for these advanced topics.

---

**You're ready to deploy! Start with PHASE 1 above.** 🚀
