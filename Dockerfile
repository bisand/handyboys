ARG NODE_VERSION=lts

FROM node:${NODE_VERSION}-alpine AS base

FROM base AS builder
ENV NODE_ENV=production
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1
WORKDIR /app
RUN apk add --no-cache \
    build-base \
    libc6-compat \
    vips-dev \
    python3 \
    make \
    g++
RUN npm install -g pnpm
COPY . .
RUN pnpm install && \
    pnpm run build
RUN mkdir -p /app/.output/server/node_modules/unstorage/drivers/
RUN cp -r /app/node_modules/unstorage/drivers/* /app/.output/server/node_modules/unstorage/drivers/

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro
COPY --from=builder /app/.output .
USER nitro
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server/index.mjs"]