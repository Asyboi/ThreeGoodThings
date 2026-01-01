FROM python:3.11-slim

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y nodejs npm curl \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Backend requirements
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Frontend dependencies & build
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install
COPY frontend/ ./
RUN npm run build

# Backend code
WORKDIR /app
COPY backend/ ./backend/

# Expose port
EXPOSE 5000

# Start Flask
CMD ["gunicorn", "--bind", "0.0.0.0:$PORT", "backend.app:app", "--workers", "4"]