# Use an official Python runtime as the base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies including Node.js and npm
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code (needed before moving frontend build)
COPY backend/ ./backend/

# Copy frontend package.json and install Node dependencies
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy frontend files
COPY frontend/ ./

# Build React frontend
RUN npm run build

# Move build into backend folder so Flask can serve it
RUN mv build ../backend/build

# Set working directory back to backend for running Flask
WORKDIR /app/backend

# Expose port (Render provides $PORT at runtime)
EXPOSE 5000

# Start the Flask app using Gunicorn and $PORT
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:$PORT app:app --workers 4"]