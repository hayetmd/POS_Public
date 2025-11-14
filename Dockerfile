# Stage 1 — Build React app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all other files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2 — Serve with lightweight web server
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config if you have one (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
