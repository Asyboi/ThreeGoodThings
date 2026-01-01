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

# Build React frontend
RUN npm run build

# Copy backend code
WORKDIR /app
COPY backend/ ./backend/

# Expose port (Render provides $PORT at runtime)
EXPOSE 5000

# Start the Flask app using Gunicorn
# --bind 0.0.0.0:$PORT ensures it uses the environment variable from Render
CMD ["gunicorn", "--bind", "0.0.0.0:$PORT", "backend.app:app", "--workers", "4"]