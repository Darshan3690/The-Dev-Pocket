# Multi-stage Dockerfile for Next.js (production)
# App: The Dev Pocket

# 1) Base deps layer: install node_modules with cache
FROM node:20-alpine AS deps
WORKDIR /app
# Install system deps needed by Prisma on Alpine
RUN apk add --no-cache openssl
COPY package*.json ./
# Use npm ci for deterministic, faster installs
RUN npm ci --include=dev
# Copy Prisma schema early to cache generate step if schema doesn't change
COPY prisma ./prisma
# Generate Prisma client (won't fail build if prisma not configured yet)
RUN npx prisma generate || true

# 2) Builder: build Next.js app
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# System deps for prisma if needed during build
RUN apk add --no-cache openssl
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the app (Turbopack per project script)
RUN npm run build

# 3) Runner: minimal image to run the app
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# System deps for prisma runtime
RUN apk add --no-cache openssl

# Create a non-root user to run the app
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

# Copy runtime assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# In case Prisma client needs to regenerate in container (safe no-op otherwise)
RUN npx prisma generate || true

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "start"]
