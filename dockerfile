# Base image
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies including Node.js and npm
RUN apt-get update && apt-get install -y \
    curl \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs npm \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Backend requirements
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Frontend dependencies and build
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install
COPY frontend/ ./
RUN npm run build

# Copy backend code
WORKDIR /app
COPY backend/ ./backend/

# Expose port (Render will override with $PORT)
EXPOSE 5000

# Start the app with Gunicorn using Render's $PORT
CMD sh -c "gunicorn --bind 0.0.0.0:\$PORT backend.app:app --workers 4"