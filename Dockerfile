# Build stage
FROM node:lts-alpine AS builder
WORKDIR /gym-up/

COPY package*.json ./

RUN --mount=type=cache,target=/gym-up/.npm \
    npm set cache /gym-up/.npm && \
    npm ci 

COPY . .

RUN npm run build

# Production stage
FROM nginx:stable-alpine3.19-slim

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /gym-up/build /usr/share/nginx/html

EXPOSE 80
