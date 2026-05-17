#!/bin/bash

# Azure App Service Deployment Script
# This script prepares the application for deployment to Azure App Service

set -e

echo "🚀 Preparing application for Azure deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get environment from argument (staging or production)
ENVIRONMENT=${1:-staging}
ENVIRONMENT_FILE=".env.${ENVIRONMENT}"

echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"

# Check if environment file exists
if [ ! -f "$ENVIRONMENT_FILE" ]; then
    echo -e "${YELLOW}Warning: ${ENVIRONMENT_FILE} not found. Using .env.example as template.${NC}"
    cp .env.example "$ENVIRONMENT_FILE"
    echo -e "${YELLOW}Please update ${ENVIRONMENT_FILE} with your actual values.${NC}"
fi

# Backend preparation
echo -e "${BLUE}Preparing backend...${NC}"
cd The_project_back

# Install dependencies
echo -e "${BLUE}Installing Python dependencies...${NC}"
pip install -r requirements.txt

# Install Gunicorn
echo -e "${BLUE}Installing Gunicorn...${NC}"
pip install gunicorn

# Collect static files
echo -e "${BLUE}Collecting static files...${NC}"
python manage.py collectstatic --noinput

# Run migrations
echo -e "${BLUE}Running database migrations...${NC}"
python manage.py migrate

cd ..

# Frontend preparation
echo -e "${BLUE}Preparing frontend...${NC}"
cd The_project_front

# Install dependencies
echo -e "${BLUE}Installing Node dependencies...${NC}"
npm ci

# Build frontend
echo -e "${BLUE}Building frontend...${NC}"
npm run build

cd ..

# Create web.config for Azure App Service (IIS)
echo -e "${BLUE}Creating web.config for Azure App Service...${NC}"
cat > web.config << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Static Files" stopProcessing="true">
          <match url="^(.*)$" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" />
          </conditions>
          <action type="Rewrite" url="{R:0}" />
        </rule>
        <rule name="Directories" stopProcessing="true">
          <match url="^(.*)$" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" />
          </conditions>
          <action type="Rewrite" url="{R:0}/" />
        </rule>
        <rule name="SPA" stopProcessing="true">
          <match url="^(.*)$" />
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <mimeMap fileExtension=".woff" mimeType="font/woff" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
    </staticContent>
    <httpProtocol>
      <customHeaders>
        <add name="Cache-Control" value="public, max-age=3600" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
EOF

echo -e "${GREEN}✓ Deployment preparation complete!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Update secrets in GitHub (Settings -> Secrets and variables -> Actions)"
echo "2. Push changes to your repository"
echo "3. GitHub Actions will automatically deploy to Azure"
