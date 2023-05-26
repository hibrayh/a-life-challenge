# Define image for running React
FROM ubuntu:22.04
# Copy all frontend code to the image
COPY . /frontend/
# Install npm
RUN apt-get update && apt-get install -y \
    npm
# Install dependencies
WORKDIR /frontend/
RUN npm install
# Start up the frontend React process
CMD ["npm", "start"]
