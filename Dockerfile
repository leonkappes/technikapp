FROM node:16-alpine AS builder
# Check https://github.com/nodejs/docker-node/#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
ENV VITE_FULL_URL "technikapp.elsetech.cloud"
ENV VITE_API_URL "technikapp-api.elsetech.cloud"
RUN npm ci
RUN npm run build


FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV VITE_FULL_URL "technikapp.elsetech.cloud"
ENV VITE_API_URL "technikapp-api.elsetech.cloud"

COPY --from=builder /app/build ./build
COPY package*.json ./

EXPOSE 3000

CMD ["node", "build/"]