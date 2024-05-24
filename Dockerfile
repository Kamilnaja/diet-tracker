# syntax=docker/dockerfile:1

FROM node:18-alpine
COPY package.json swagger.js tsconfig.json package-lock.json* ./
RUN npm ci && npm cache clean --force 
COPY ./src ./src
CMD ["npm", "run", "dev"]
EXPOSE 8080