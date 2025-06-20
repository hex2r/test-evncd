FROM node:24-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm@10.12.1

COPY . .

RUN apk add openssl3

COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile

RUN npx prisma generate

RUN npx prisma migrate dev

EXPOSE 3000
