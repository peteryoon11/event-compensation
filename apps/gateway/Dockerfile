# 1. base image
FROM node:18-alpine

# 2. working directory
WORKDIR /app

# 3. copy all files and install
COPY . .

# 4. install dependencies
RUN npm install

# 5. build only the target app
RUN npm run build apps/gateway

# 6. expose and run
EXPOSE 3030
CMD ["node", "dist/apps/gateway/main"]
