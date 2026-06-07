# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run development server with host configuration
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
