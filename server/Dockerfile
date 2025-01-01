# Dockerfile cho server (Node.js, Express)
FROM node:20.17.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy tất cả các tệp còn lại vào container
COPY . .

# Tải tệp .env từ thư mục server
ENV DB_USERNAME=root
ENV DB_PASSWORD=change-me
ENV DB_DATABASE_NAME=db_ecommerce
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_DIALECT=mysql
ENV JWT_SECRET=change-me
ENV JWT_EXPIRES_IN=1h

# Cấu hình môi trường cho Node.js (dev hoặc prod)
ENV NODE_SECURE=develop

CMD ["npm", "run", "start"]
