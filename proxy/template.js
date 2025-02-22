
// 通过 config 模块获取配置信息（如果有）
// const config = require('config');
// const _config = config.get('template');

// 模板查询函数
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
