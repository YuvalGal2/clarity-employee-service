FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install --production


# Copy all files from the dist folder
COPY ./ ./
COPY .env.docker .env

# Expose the port on which the app will run
EXPOSE 8000

CMD PWD
CMD npm run start:prod