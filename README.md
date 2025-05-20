## mongodb 
cd docker/mongodb
docker-compose.yml -p  up -d

## 서버 실행
cd ../..
/docker-compose.yml -p event-compensation up -d
