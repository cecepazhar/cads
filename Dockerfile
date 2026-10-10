FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm run build

ENV NODE_ENV=production
ENV PORT=8090
ENV HOST=0.0.0.0

EXPOSE 8090

CMD ["pnpm", "run", "preview", "--host", "0.0.0.0", "--port", "8090"]
