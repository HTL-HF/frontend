FROM node:20.13.1-bullseye

ARG PORT
ARG BACKEND_IP
ARG BACKEND_PORT

ENV VITE_PORT=$PORT
ENV VITE_BACKEND_IP=$BACKEND_IP
ENV VITE_BACKEND_PORT=$BACKEND_PORT

WORKDIR /

COPY src src
COPY index.html index.html
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.json tsconfig.json
COPY tsconfig.node.json tsconfig.node.json
COPY vite.config.ts vite.config.ts

RUN npm clean-install

EXPOSE $PORT
RUN npm run build

ENTRYPOINT ["npm", "run", "preview"]
# ENTRYPOINT [ "npm", "run", "dev" ]