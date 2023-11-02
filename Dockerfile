FROM node:lts-slim

# Create app directory
WORKDIR /usr/user-management

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Expose the port
EXPOSE 5000

# Command to execute when the image is instantiated
CMD ["npm","start"]