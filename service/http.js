const http = require("http");

const client = http.request(
    {
        hostname: "www.baidu.com",
        port: 80,
        path: "/s?wd=afd&rsv_spt=1&rsv_iqid=0xf70d593600011b4e&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=&tn=baiduhome_pg&ch=&rsv_enter=1&inputT=929"
    },
    res => {
        let data1 = Buffer.alloc(0);
        res.on("data", data => {
            data1 = Buffer.concat([data1, data], data1.length + data.length);
        });
        res.on("end", () => {
            console.log(data1.toString())
        });
    }
);
client.end();
