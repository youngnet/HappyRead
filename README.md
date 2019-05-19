#### 基于nodejs和react开发的移动端h5书城

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
- 命令
    - npm run start 
    - npm run build 
    - npm run server 