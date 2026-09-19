FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./backend/
RUN npm install --prefix backend

COPY backend ./backend

ENV PORT=5000
EXPOSE 5000

CMD ["npm", "--prefix", "backend", "run", "start"]
