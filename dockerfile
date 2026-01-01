# Use an official Python runtime as the base image
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies including Node.js and npm
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    curl \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Backend requirements
COPY backend/requirements.txt ./ 
RUN pip install --no-cache-dir -r requirements.txt

# Frontend dependencies
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy frontend files
COPY frontend/ ./

# Build React
RUN npm run build

# Backend code
WORKDIR /app
COPY backend/ ./backend/

EXPOSE 5000

# Start Flask via Gunicorn
CMD sh -c "gunicorn --bind 0.0.0.0:$PORT backend.app:app --workers 4"
