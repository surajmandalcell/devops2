FROM node:18-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

ARG STATE=PRODUCTION
ENV STATE=${STATE}

EXPOSE 3000

CMD ["node", "server.js"]
