# Continuous Delivery Quick Start

## 🚀 5-Minute Setup

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add CD configuration"
git push origin main
```

### Step 2: Add GitHub Secrets
Go to: **GitHub → Settings → Secrets and variables → Actions**

Add these 6 secrets:
1. `AZURE_APP_NAME_STAGING`
2. `AZURE_PUBLISH_PROFILE_STAGING`
3. `AZURE_APP_NAME_PRODUCTION`
4. `AZURE_PUBLISH_PROFILE_PRODUCTION`
5. `PRODUCTION_URL`

### Step 3: Watch Deployment
Go to: **Actions tab** and monitor the workflow

---

## 📋 What Gets Deployed

### On Every Push to `develop`:
- ✅ Run tests
- ✅ Build frontend (npm run build)
- ✅ Deploy to staging environment
- ✅ Run migrations

### On Every Push to `main`:
- ✅ Run all tests
- ✅ Build frontend
- ✅ Deploy to production
- ✅ Run migrations

---

## 🔧 Local Testing

Run everything locally:
```bash
docker-compose up -d
```

Access:
- Frontend: http://localhost
- Backend: http://localhost:8000/admin

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | CI/CD pipeline |
| `Dockerfile.backend` | Backend container |
| `Dockerfile.frontend` | Frontend container |
| `docker-compose.yml` | Local development |
| `.env.example` | Environment template |
| `DEPLOYMENT_GUIDE.md` | Full setup guide |

---

## 🔐 Environment Variables

### Staging
Update `.env.staging` with:
- `ALLOWED_HOSTS`
- `DATABASE_URL`
- `SECRET_KEY`

### Production
Update `.env.production` with:
- `ALLOWED_HOSTS`
- `DATABASE_URL`
- `SECRET_KEY`
- Security headers

---

## ✅ Deployment Checklist

- [ ] GitHub Actions enabled
- [ ] Azure resources created
- [ ] Secrets added to GitHub
- [ ] Environment files updated
- [ ] Database configured
- [ ] First test deployment to staging
- [ ] Verified staging works
- [ ] Merged to main for production
- [ ] Verified production works

---

## 🚨 Common Issues

### "Permission denied" on GitHub Actions
→ Go to repo Settings → Actions → General → Workflow permissions → Select "Read and write"

### App won't start in Azure
→ Check logs: `az webapp log tail --resource-group your-rg --name your-app`

### Database connection error
→ Verify `DATABASE_URL` in Azure App Service settings

### Frontend showing 404
→ Ensure `npm run build` produces `/dist` folder

---

## 📊 Monitoring

View logs:
```bash
az webapp log tail -g your-resource-group -n your-app-name
```

View deployment history:
```bash
az webapp deployment list -g your-resource-group -n your-app-name
```

---

## 🔄 Rollback

If deployment goes wrong:
1. Go to Azure Portal
2. App Service → Deployment Center
3. Select previous successful deployment
4. Click "Swap" to rollback

---

## 📞 Support

- **Azure Docs**: https://docs.microsoft.com/azure/app-service/
- **GitHub Actions**: https://docs.github.com/en/actions
- **Django Deployment**: https://docs.djangoproject.com/en/6.0/howto/deployment/
- **React Deployment**: https://vitejs.dev/guide/static-deploy.html

---

## Next: Advanced Configuration

After basic setup works, consider:
- [ ] Azure Key Vault for secrets management
- [ ] Application Insights for monitoring
- [ ] Azure CDN for faster delivery
- [ ] Automated backups
- [ ] Custom domain + SSL
- [ ] Staging slots for zero-downtime deployments
