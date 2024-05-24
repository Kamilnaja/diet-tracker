# syntax=docker/dockerfile:1

FROM node:18-alpine
COPY package.json ./
RUN npm ci && npm cache clean --force 
RUN yarn install --production
CMD ["npm", "run", "dev"]
EXPOSE 8080