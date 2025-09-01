FROM node:alpine AS builder
RUN apk add --no-cache openssl curl
# install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# copy and install dependencies with pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy prisma schema BEFORE generating client
COPY prisma ./prisma/

# Generate Prisma client BEFORE copying rest of files
ENV PRISMA_SCHEMA_ENGINE_TYPE=binary
ENV PRISMA_QUERY_ENGINE_TYPE=binary
RUN pnpm dlx prisma generate

# copy the rest of the files and build the app
COPY . .

# Build Next.js app (remove duplicate build command)
RUN pnpm run build

# Stage 2: Production
FROM node:alpine AS runner
# Install runtime dependencies
RUN apk add --no-cache curl openssl
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create a non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy generated Prisma client
COPY --from=builder /app/lib/generated ./lib/generated

# Change ownership to nextjs user
RUN chown -R nextjs:nodejs /app
USER nextjs

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Expose port
EXPOSE 3000

# start the app
CMD ["node", "server.js"]