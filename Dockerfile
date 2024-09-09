FROM node:20.13.1-bullseye

ARG PORT_ARG
ARG BACKEND_BASE_URL_ARG

ENV PORT=$PORT_ARG
ENV BACKEND_BASE_URL=$BACKEND_BASE_URL_ARG

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

ENTRYPOINT ["npm", "run", "preview"]
