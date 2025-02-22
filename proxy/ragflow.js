
const axios = require("axios");
const config = require('config');

// 获取ragflow的配置
const _ragflowConfig = config.get('ragflow');
const ragflowConfig = {
    host: process.env.RAGFLOW_HOST || _ragflowConfig.host, // ragflow ip
    port: process.env.RAGFLOW_PORT || _ragflowConfig.port // ragflow 端口
};

// 将ragflow的响应转换为dify的响应
function ragflow_res_convert_2_dify_res(data) {
    return {
        "records": data.data.chunks.map(chunk => ({
            "metadata": {
                "path": chunk.document_keyword,
                "description": chunk.document_keyword
            },
            "score": chunk.similarity,
            "title": chunk.document_keyword,
            "content": chunk.content
        }))
    };
}

// 返回一个promise对象, 执行ragflow的查询
function RagflowQuery(Proxy) {
    return new Promise(async (resolve, reject) => {
        try {
            // 通过axios请求ragflow的api
            const response = await axios.post(`http://${ragflowConfig.host}:${ragflowConfig.port}/api/v1/retrieval`,
                {
                    "question": Proxy.query,
                    "dataset_ids": [Proxy.knowledge_id],
                    "top_k": Proxy.top_k,
                    "similarity_threshold": Proxy.score
                }, {
                headers: {
                    'Authorization': Proxy.authorization,
                    'Content-Type': 'application/json'
                }
            }, {
                timeout: 5000, // 5s超时
            });

            let data = response.data;

            // 如果ragflow返回的code不为0, 则返回错误信息
            if (data.code !== 0) {
                let error_code = 2001;

                // 授权失败
                if (data.code === 109) {
                    error_code = 1002;
                }

                // 知识库不存在
                if (data.code === 102) {
                    error_code = 2001;
                }

                // 返回错误信息
                reject({ error_code: error_code, error_msg: data.message });
                return;
            }

            // 将ragflow的响应转换为dify的响应
            resolve(ragflow_res_convert_2_dify_res(data));
        } catch (err) {
            console.error('Error fetching data from ragflow API:', err);
            reject({ error_code: 2001, error_msg: "Error fetching data from ragflow API" });
        }
    });
}

module.exports = RagflowQuery;
