# 使用官方 Node.js 镜像作为基础镜像
FROM node:18.20-alpine3.21

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

# 暴露应用运行的端口
EXPOSE 3000

# 设置环境变量
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=3000
ENV RAGFLOW_HOST=127.0.0.1
ENV RAGFLOW_PORT=8080
ENV PROXY_TARGET=ragflow

# 启动应用
CMD ["node", "main.js"]
