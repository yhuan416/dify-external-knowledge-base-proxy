const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('config');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const _serverConfig = config.get('server');
const serverConfig = {
    host: _serverConfig.host, // 该服务监听的ip
    port: _serverConfig.port // 该服务监听的端口
};

const _ragflowConfig = config.get('ragflow');
const ragflowConfig = {
    host: process.env.RAGFLOW_HOST || _ragflowConfig.host, // ragflow ip
    port: process.env.RAGFLOW_PORT || _ragflowConfig.port // ragflow 端口
};

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

app.post('/api/v1/retrieval', async (req, res) => {
    console.log(req.headers.authorization);
    console.log(req.body);

    try {
        // 通过axios请求ragflow的api
        const response = await axios.post(`http://${ragflowConfig.host}:${ragflowConfig.port}/api/v1/retrieval`,
            {
                "question": req.body.query,
                "dataset_ids": [req.body.knowledge_id],
                "top_k": req.body.retrieval_setting.top_k,
                "similarity_threshold": req.body.retrieval_setting.score_threshold
            }, {
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json'
            }
        });

        // 将ragflow的响应转换为dify的响应
        const difyResponse = ragflow_res_convert_2_dify_res(response.data);
        res.json(difyResponse);
    } catch (error) {
        console.error('Error fetching data from ragflow API:', error);
        res.status(500).json({ error: 'Failed to fetch data from ragflow API' });
    }
});

app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server running at http://${serverConfig.host}:${serverConfig.port}/`);
});
