# Use an official Python runtime as the base image
FROM python:3.11-slim

# Set working directory
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

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy frontend package.json and install Node dependencies
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy frontend files
COPY frontend/ ./

# Build React frontend if needed
# RUN npm run build

# Copy backend code
WORKDIR /app
COPY backend/ ./backend/

# Expose ports
EXPOSE 5000 5173

# Run Flask backend with Gunicorn, using PORT env variable
CMD ["sh", "-c", "gunicorn -w 4 -b 0.0.0.0:${PORT:-5000} backend.app:app"]