# Use the official Node.js 16 image as a base
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5173 for the react app
EXPOSE 5173

# Start both the react app and json-server when the container starts
CMD ["npm", "start"]