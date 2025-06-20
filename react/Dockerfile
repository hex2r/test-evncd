FROM node:24-alpine
 
WORKDIR /usr/src/app

RUN npm install -g pnpm@10.12.1

COPY . .

RUN pnpm install
 
EXPOSE 5173
