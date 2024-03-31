#  Set Node.js version 18
FROM node:20-alpine

# Update os
RUN echo "Installing system dependencies" && \
    apk update && \
    apk add bash make && \
    echo "Clean up .." && \
    rm -rf /var/cache/apks/*

# Set ENV
ENV ROOT /react-app

# Set workdir
WORKDIR ${ROOT}

COPY react-app/Makefile react-app/package.json react-app/yarn.lock ./


# Install dependencies
#   Run make install in Makefile in folder /react-app
RUN make install



