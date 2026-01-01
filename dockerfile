# Base image
FROM python:3.11-slim

WORKDIR /app

# Install Node.js & system deps
RUN apt-get update && apt-get install -y \
    curl \
    nodejs \
    npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Backend dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Frontend dependencies and build
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install
COPY frontend/ ./
# Build React directly into backend/build
RUN npm run build && mkdir -p /app/backend/build && cp -r build/* /app/backend/build/

# Backend code
WORKDIR /app
COPY backend/ ./backend/

# Expose port
EXPOSE 5000

# Start Flask via Gunicorn (uses $PORT from Render)
CMD sh -c "gunicorn --bind 0.0.0.0:$PORT backend.app:app --workers 4"
