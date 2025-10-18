FROM node:22.20-alpine3.21 as builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
ARG VITE_API_BASE_URL
RUN npm run build

FROM nginx:1.29-alpine3.22
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]