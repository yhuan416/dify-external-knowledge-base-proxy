# dify-external-knowledge-base-proxy

dify-external-knowledge-base-proxy 是 dify 的外部知识库代理服务, 目前支持对接 ragflow 的 api 接口。

## 本地构建docker镜像

``` sh
cd docker-ekbp
docker compose build
```

## 使用

``` sh
cd docker-ekbp
cp .env.example .env

# 修改 .env 文件配置, 略
# ...

# 启动服务
docker compose up -d
```

## 新增代理服务模块

[README.md](proxy/README.md)

---
End
