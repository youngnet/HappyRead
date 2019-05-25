#### 基于koa和react开发的移动端h5书城

> 该项目主要是针对react最新版本推出的reacthook进行实践，同时针对使用node作为服务端项目的构建，以及数据库的使用项目部署等 ( nginx, mysql, pm2 等简单的运用)

- 命令
    - npm run start 
    - npm run build 
    - npm run server 
- 配置文件
    - config.json
        - apiConfig axios请求配置
        - mysqlConfig mysql配置
        ```json
        {
            "apiConfig": {
                "development": {
                    "baseURL": "/test"
                },
                "production": {
                    "baseURL": ""
                }
            },
            "mysqlConfig": {
                "host": "localhost",
                "user": "demo",
                "password": "demo",
                "database": "demo"
            }
        }                                       
        ```
    - setupProxy.js 
        - dev环境代理解决跨域问题