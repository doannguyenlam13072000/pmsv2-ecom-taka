# Set Node.js version 20.3.0
FROM node:20.3.0-alpine

# Update OS and install necessary packages
RUN apk update && \
    apk add --no-cache bash make && \
    rm -rf /var/cache/apk/*

# Set environment variable
ENV ROOT /vue-app

# Set working directory
WORKDIR ${ROOT}

# Copy package.json and yarn.lock files
COPY vue-app/Makefile vue-app/package.json vue-app/yarn.lock ./

# Install dependencies
# Run make install in the /vue-app directory
RUN make install
