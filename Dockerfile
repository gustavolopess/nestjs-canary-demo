#DEPENDENCIES IMG
FROM node:12.16-alpine3.11 as dependencies
WORKDIR /app
COPY package*.json ./
ARG NPM_TOKEN
RUN npm ci --unsafe-perm

#BUILD
FROM dependencies as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./
ARG NPM_TOKEN
COPY . ./
RUN npm run build

#PROD IMAGE
FROM node:12.16-alpine3.11
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules

CMD ["node", "./dist/main.js"]