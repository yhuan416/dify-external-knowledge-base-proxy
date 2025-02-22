const Proxy = require('./proxy/proxy');

const ragflow = new Proxy("ragflow", {
    knowledge_id: "44007436ed2811efb7af0242ac120002",
    authorization: "Bearer ragflow-JkOWQ0Y2JjZWM4MDExZWY4NjkwMDI0Mm",
    query: "搜索一下数据结构，线性表相关知识",
    top_k: 2,
    score: 0.5
});

console.log(ragflow);

ragflow.then((res) => {
    console.log(res);
});
