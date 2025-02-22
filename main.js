const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const Proxy = require('./proxy/proxy');

const app = express();
app.use(bodyParser.json());

const _serverConfig = config.get('server');
const serverConfig = {
    host: _serverConfig.host, // 该服务监听的ip
    port: _serverConfig.port // 该服务监听的端口
};

const target = process.env.PROXY_TARGET || _serverConfig.target;

app.post('/api/v1/retrieval', async (req, res) => {
    console.log("Use Target", target);
    console.log(req.headers.authorization);
    console.log(req.body);

    // 根据target配置, 生成一个proxy对象 <Promise>
    const query = new Proxy(target, {
        knowledge_id: req.body.knowledge_id,
        authorization: req.headers.authorization,
        query: req.body.query,
        top_k: req.body.retrieval_setting.top_k,
        score: req.body.retrieval_setting.score_threshold
    });

    // 等待proxy对象返回结果, 并返回给用户
    query
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});

app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server running at http://${serverConfig.host}:${serverConfig.port}/`);
});
