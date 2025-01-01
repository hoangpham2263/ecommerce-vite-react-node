#!/bin/bash

if [ "$DATABASE" = "mysql" ]; then
    echo "Waiting for mysql..."
    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done
    echo "MySQL started"
fi

# Chạy migrations nếu cần (cho ứng dụng sử dụng Sequelize hoặc TypeORM)
echo "Appling database migrations..."
npm run migrate

# Chạy ứng dụng chính
exec "$@"
