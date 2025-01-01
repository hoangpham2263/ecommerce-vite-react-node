#!/bin/bash

# Di chuyển đến thư mục server nơi chứa docker-compose.yml
cd /path/to/your/server

# Hiển thị menu lựa chọn cho người dùng
echo "Choose an option:"
echo "1. Build Docker"
echo "2. Update code from repository"
echo "3. Run migrations and seeders"
read -p "Enter your choice (1, 2 or 3): " choice

# Xử lý lựa chọn của người dùng
if [[ "$choice" == "1" ]]; then
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

elif [[ "$choice" == "2" ]]; then
    # Cập nhật code từ repository Git
    echo "Updating code from Git repository..."
    git pull origin main  # Hoặc branch bạn sử dụng

    # Sau khi pull, bạn có thể rebuild lại Docker container nếu cần
    echo "Rebuilding Docker containers..."
    docker-compose up --build -d

elif [[ "$choice" == "3" ]]; then
    # Đảm bảo rằng các container đã khởi động trước khi chạy các lệnh Sequelize
    echo "Waiting for containers to start..."
    sleep 2  # Chờ thêm thời gian để container MySQL kịp khởi động

    # Kiểm tra trạng thái MySQL
    echo "Checking MySQL status..."
    docker-compose exec db-service mysqladmin -uroot -p"$MYSQL_ROOT_PASSWORD" ping

    # Xác nhận trước khi xóa dữ liệu
    read -p "Are you sure you want to delete all data in the database? (y/n): " confirm
    if [[ "$confirm" != "y" ]]; then
        echo "Aborted."
        exit 0
    fi

    # Xóa và tạo lại cơ sở dữ liệu db_ecommerce
    echo "Dropping and recreating db_ecommerce database..."
    docker-compose exec db-service mysql -uroot -p"$MYSQL_ROOT_PASSWORD" -e "DROP DATABASE IF EXISTS db_ecommerce; CREATE DATABASE db_ecommerce;"

    # Nếu không có lỗi, tiếp tục chạy migrate và seed
    echo "Running migrations..."
    docker-compose exec server npx sequelize-cli db:migrate

    echo "Running seeders..."
    docker-compose exec server npx sequelize-cli db:seed:all
fi

# Hiển thị thông báo hoàn thành
echo "Script execution is complete!"
