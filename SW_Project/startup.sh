#!/bin/bash

# Startup script for Azure App Service
# Place this at root level or reference it in App Service settings

echo "Starting application..."

# Set Python environment
export PYTHONUNBUFFERED=1
export PYTHONDONTWRITEBYTECODE=1

# Navigate to backend
cd The_project_back

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

# Run migrations
echo "Running database migrations..."
python manage.py migrate --noinput

# Start Gunicorn
echo "Starting Gunicorn server..."
gunicorn backend.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --worker-class sync \
    --timeout 60 \
    --max-requests 1000 \
    --max-requests-jitter 50 \
    --access-logfile - \
    --error-logfile -
