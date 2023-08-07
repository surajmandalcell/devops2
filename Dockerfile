
FROM node:18-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml tsconfig.json ./
COPY src ./src

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

WORKDIR /app

ARG STATE=PRODUCTION
ENV STATE=${STATE}

EXPOSE 3000

CMD ["node", "server.js"]
