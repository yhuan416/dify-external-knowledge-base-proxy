function Proxy(target, { knowledge_id, authorization, query, top_k, score }) {
    this.target = target;
    this.query = query;
    this.top_k = top_k;
    this.score = score;
    this.knowledge_id = knowledge_id;
    this.authorization = authorization;

    try {
        // 根据target自动引入不同的模块, 并返回一个promise
        let _query = require('./' + target);
        return _query(this);
    } catch (e) {
        console.error(e);
    }

    // 如果target不存在, 则返回一个错误的promise
    return new Promise((resolve, reject) => {
        reject({ error_code: 2001, error_msg: "Unknown target" });
    });
}

module.exports = Proxy;
