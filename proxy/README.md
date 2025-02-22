# 接入新的数据库

## 1. 添加一个以新增的目标'target'为名的文件

``` js
// file: proxy/template.js

// 实现查询函数
// 该函数接受一个 Proxy 对象作为参数，返回一个 Promise 对象
function TemplateQuery(Proxy) {
    return new Promise(async (resolve, reject) => {
        // 查询语句
        // ...

        // 返回结果
        resolve({
            "records": [
                {
                    "metadata": {
                        "path": "file path",
                        "description": "file description"
                    },
                    "score": 0.9,
                    "title": "title",
                    "content": "content"
                }
            ]
        });
    });
}

// 导出查询函数
module.exports = TemplateQuery;
```

## 2. 在config.json中添加配置(可选)

``` json
{
    "server": {
        "host": "0.0.0.0",
        "port": 3000,
        "target": "ragflow"
    },
    "ragflow": {
        "host": "127.0.0.1",
        "port": 8080
    },
    // 新增的配置
    "template": {
        "host": "0.0.0.0",
        "port": 0
    }
}
```

## 3. 启用新的target方法一(修改配置文件)

``` json
    "server": {
        "host": "0.0.0.0",
        "port": 3000,
        // 修改为新增的target
        "target": "template"
    },
```

## 4. 启用新的target方法二(环境变量)

``` sh
export PROXY_TARGET=template
```

*PS: 如果通过docker运行, 需要视情况修改.env文件和docker-compose.yml文件的Environment字段*

---
End.
