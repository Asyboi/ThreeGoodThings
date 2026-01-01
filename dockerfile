# -----------------------------
# Base image
# -----------------------------
FROM python:3.11-slim

# -----------------------------
# Set working directory
# -----------------------------
WORKDIR /app

# -----------------------------
# Install system dependencies
# -----------------------------
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    lsb-release \
    build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# -----------------------------
# Copy backend requirements and install Python dependencies
# -----------------------------
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# -----------------------------
# Copy frontend and install Node dependencies
# -----------------------------
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# -----------------------------
# Copy frontend source code and build
# -----------------------------
COPY frontend/ ./
RUN npm run build

# -----------------------------
# Move the frontend build into backend folder
# -----------------------------
RUN mv /app/frontend/build /app/backend/build

# -----------------------------
# Copy backend code
# -----------------------------
WORKDIR /app
COPY backend/ ./backend/

# -----------------------------
# Expose the port (Render uses $PORT)
# -----------------------------
EXPOSE 5000

# -----------------------------
# Start Flask app using Gunicorn
# -----------------------------
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:$PORT backend.app:app --workers 4"]
