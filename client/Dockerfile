# Dockerfile cho client (Vite React)
FROM node:20.17.0-alpine

WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy tất cả các tệp còn lại vào container
COPY . .

# Chạy build cho ứng dụng client
RUN npm run build

# Cấu hình môi trường cho Vite
ENV VITE_API_API_URL=http://localhost:8000
ENV VITE_API_GOOGLE_CLIENT_ID=https://www.googleapis.com/oauth2/v3/userinfo

# Chạy ứng dụng client trong chế độ phát triển
CMD ["npm", "run", "dev"]
