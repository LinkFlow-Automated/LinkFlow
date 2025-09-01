FROM node:alpine AS builder

RUN apk add --no-cache openssl curl

# install npm
RUN corepack enable && corepack prepare npm@latest --activate

WORKDIR /app

# copy and install dependencies with pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# copy the rest of the files and build the app
COPY . .
RUN pnpm run build

# Generate Prisma client
ENV PRISMA_SCHEMA_ENGINE_TYPE=binary
ENV PRISMA_QUERY_ENGINE_TYPE=binary
RUN pnpm dlx prisma generate

# Build Next.js app
RUN pnpm build

# Stage 2: Production
FROM node:alpine AS runner

# Install runtime dependencies
RUN apk add --no-cache curl openssl

WORKDIR /app

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create a non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Expose port
EXPOSE 3000

# start the app
CMD ["pnpm", "run", "start"]