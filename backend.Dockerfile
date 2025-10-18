FROM node:22.20-alpine3.21 as builder
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend .
RUN npm run build

FROM node:22.20-alpine3.21
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY backend/package*.json ./
RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/main.js"]