## 主机监控与审计

## 项目结构
```bash
├── README.md
├── dist
├── favicon.ico
├── index.html
├── package-lock.json
├── package.json
├── src                                    # 项目源码
│   ├── App.vue                    # 入口组件
│   ├── api                 # 通信基类以及后端交互接口
│   ├── assets              # 资源文件
│   ├── components          # 自定义组件
│   ├── store                    # Vuex 统一状态存储
│   ├── utils                           # 样式、时间处理等公用函数
│   ├── main.js             # 入口文件
│   ├── router           # Vue 路由
│   ├── socket.io.min.js 
│   └── views               # 前端视图
└── webpack.config.js
```

## 运行
```bash
# 启动 webpack-dev-server 服务监控
npm run dev 

# 编译
npm run build
```

## 核心接口
位于 `api/core` 目录下有两个 `Request` 请求基类，`BaseJWRequest.js` 对应`Java`后端，`BasePyRequest.js` 对应 `Python` 后端

### Python 后端接口细节
获取数据请求全部为 `GET` 方法，执行动作如增删改全部为 `POST` 方法，接口区别如下
#### GET 方法
1. URL 规则为 /**`api`**/xxx/xxx
2. 例子
```javascript
// 例如获取菜单数据
import { sysRequest } from 'path/api/SystemRequest'

sysRequest.resource.get().then(res => {
    sysRequest.responseProcess(res, {
        success: () => {
            // 获取成功的逻辑
        },
        error: () => {
            // 获取失败的逻辑
        }
    })
})
```

#### POST 方法
1. URL 规则为 /**`ctrl`**/xxx/< `add` | `del` | `edit` >
2. 例子
```javascript
// 例如获取删除菜单数据
import { sysRequest } from 'path/api/SystemRequest'

let params = {
    id: resourceID
}

sysRequest.resource.del(params).then(res => {
    sysRequest.responseProcess(res, {
        success: () => {
            // 删除成功的逻辑
        },
        error: () => {
            // 删除失败的逻辑
        }
    })
})
```


### 审计后端接口细节
审计的后端请求基于 `RESTful` 规范，需要提供 `GET`、`DELETE`、 `POST`、 `PUT`、 方法对应的操作为：

* GET -- 获取数据
* POST -- 添加数据
* PUT -- 修改数据
* DELETE -- 删除数据
