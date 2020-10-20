FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD [ "npm", "start"]