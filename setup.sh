#!/bin/bash

# Dừng và xóa tất cả container đang chạy
echo "Stopping and removing all existing containers..."
docker-compose down

# Xóa các image không sử dụng
echo "Removing dangling images..."
docker image prune -f

# Build và chạy Docker Compose
echo "Building and starting Docker Compose..."
docker-compose up --build -d

# Kiểm tra trạng thái các container
echo "Checking container status..."
docker ps

# Hiển thị thông báo hoàn thành
echo "Docker environment setup is complete!"
