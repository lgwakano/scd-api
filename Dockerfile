# Use an official Node.js runtime as a base image
FROM node:18.13.0-alpine

# Install Docker client
RUN apk --no-cache add docker

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY . /app

# Make the start-db.sh script executable
RUN chmod +x /app/start-db.sh

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the application will run on
EXPOSE 3001

# Specify the command to run when the container starts
CMD ["npm", "run", "start"]
