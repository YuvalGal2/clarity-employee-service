FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --only=production
RUN npm run typeorm migration:run

# Copy the application code to the working directory
COPY . .

EXPOSE 8000
# Start the NestJS application
CMD ["npm", "run", "start:prod"]

