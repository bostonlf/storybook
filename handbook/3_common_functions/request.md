
```js
/**
 * Returns a Token
 * Example Usage:
 * myres = await ReGetACtoken();
 *
 * @return object - jQuery promise (resolved) with token info.
 */
const ReGetACtoken = () => {
    return new Promise((resolve, reject) => {
        api.refreshACtokenByRefreshToken().then(res => {
            if (res) {
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);//这个也更新
                localStorage.setItem("getTokenFlag", "baseRFtokenGetACtokenSuccess")
                resolve(res.data.access_token)
            }
        }).catch(error => {
            console.log("refreshACtokenByRefreshToken gotoSSO error :" + error)
            reject(error)
        }).finally(() => {
            console.log("finally")
        })
    })
}
```


```js
/**
 * Example Usage:
 * myres = await ReGetDataAgain(config);
 *
 * @param object config
 */
const ReGetDataAgain = (requestINFO) => {
    return new Promise((resolve, reject) => {
        if (requestINFO) {
            const resendRequest = axios.create({
                // 公共配置
                // baseURL:"http://iwenwiki.com",
                timeout: 5000
            })
            requestINFO.headers.Authorization = "Bearer " + localStorage.getItem('access_token');
            requestINFO.headers['Content-Type'] = "application/json"
            resolve(resendRequest(requestINFO));//这个是生效的
        }
    })
}
```

```js
/**
 * get ACtoken again，then send the request again
 * Returns a Token
 * Example Usage:
 * myres = NoAuthHandler(requestINFO);
 *
 * @return object - jQuery promise (resolved) with token info.
 */
const NoAuthHandler = async (config) => {
    // localStorage.setItem("getTokenFlag", "ACtokenExpired")
    let myres = "myres";
    let newData = "newData"
    myres = await ReGetACtoken();
    newData = await ReGetDataAgain(config)
    return newData
}
```

```js
/**
 * SSO
 * 
 * Example Usage:
 * gotoSSO();
 *
 */
const gotoSSO = (requestINFO) => {
    console.log("debug 555555");
    api.refreshACtokenByRefreshToken().then(res => {
        if (res) {
            console.log("debug 55555522222");
            console.log(JSON.stringify(res))
            if (res.status == 200) {
                console.log(200)
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);//这个也更新
                localStorage.setItem("getTokenFlag", "baseRFtokenGetACtokenSuccess")
                if (requestINFO) {
                    const resendRequest = axios.create({
                        // 公共配置
                        // baseURL:"http://iwenwiki.com",
                        timeout: 5000
                    })
                    requestINFO.headers.Authorization = "Bearer " + localStorage.getItem('access_token');
                    requestINFO.headers['Content-Type'] = "application/json"
                    console.log("debug 88888");
                    return resendRequest(requestINFO);//这个是生效的
                }

                // props.history.push('/Homepage')
            } else if (res.status === 400) {
                //"data":{"code":400,"message":"clientName can not be null","data":null}
                console.log("gotoSSO" + 400)
            } else if (res.status === 401) { //means refresh Expired

            } else {
                console.log("gotoSSO" + 800)
            }
        } else {
            alert("no resposon , should goto sso page")
            // localStorage.setItem("getTokenFlag", "RFtokenExpired")
            let SSOprePathname = window.location.pathname;
            if (process.env.PUBLIC_URL) SSOprePathname = window.location.pathname.split(process.env.PUBLIC_URL)[1];
            localStorage.setItem("SSOprePathname", SSOprePathname);
            window.location.href = "/SSOlogin"
        }

    }).then(res => {
        //能走到这里，但是怎么获取之前的请求的参数 ？通过error获取
        //能返回数据，结果前面的 return resendRequest(requestINFO); 返回的promis对象
        console.log("再发起一次之前的请求" + JSON.stringify(res))
        console.log("debug 999999");
        return res
    }).catch(error => {
        console.log("gotoSSO error :" + error)
    })
    /* previous code
    let SSOprePathname = window.location.pathname;
    if (process.env.PUBLIC_URL) SSOprePathname = window.location.pathname.split(process.env.PUBLIC_URL)[1];
    localStorage.setItem("SSOprePathname", SSOprePathname)
    localStorage.setItem('access_token', '')//clear token,then page will be redirected to SSO pages
    window.location.href = window.location.origin + process.env.PUBLIC_URL + '/SSOlogin.html'
    */
}
```

```js
/**
 * Function to handle errors
 *
 * Example Usage:
 * errorHandle(response.status, response.info, error.response.config);
 *
 * @param status, info, requestINFO
 * @return object - jQuery promise (resolved) with User record.
 */

/**
 * 处理失败的方法
 * status:状态码
 * info:信息
 */
const errorHandle = (status, info, requestINFO) => {
    console.log("debug 4444444");
    switch (status) {
        case 400:
            console.log("语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。(400)")
            break;
        case 401:
            // token:令牌
            console.log("服务器认证失败(401)")
            if(!localStorage.getItem('refresh_token')){//此时，ACtoken失效，但是RFtoken没有，就无法用RF去获取AC,直接跳到auth服务去全部重新获取
                console.log("debuglllllccccccccccllllll")
                window.location.href = getSSOurl();
            }else if(localStorage.getItem("getTokenFlag") === "ACtokenExpired"){
                console.log("refresh_token 失111效")
                console.log("debuglllllcccccccccc33333")
                localStorage.setItem("getTokenFlag", "RFtokenExpired")
                window.location.href = getSSOurl();
            }else{
                console.log("debuglllllcccccccccc222222")
                localStorage.setItem("getTokenFlag", "ACtokenExpired")
                return NoAuthHandler(requestINFO);
            }
            
            break;
        case 403:
            console.log("服务器已经理解请求，但是拒绝执行它(403)");
            gotoSSO();
            break;
        case 404:
            console.log("请检查网络请求地址(404)")
            break;
        case 408:
            console.log("请求超时(408)")
            break;
        case 500:
            console.log("服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现(500)")
            break;
        case 502:
            console.log("作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应(502)")
            break;
        case 503:
            console.log("服务不可用(503)")
            break;
        case 504:
            console.log("网络超时(504)")
            break;
        case 505:
            console.log("HTTP版本不受支持(505)")
            break;
        default:
            console.log(info)
            break;
    }
}
```

```js
/**
 * Create axios
 *
 * Example Usage:
 * instance.interceptors.response.use();
 *
 * @param object requestData - Contain either Facebook or Instagram tokens.
 * @return object - jQuery promise (resolved) with User record.
 */

/**
 * 创建axios实例对象
 */
const instance = axios.create({
    // 公共配置
    // baseURL:"http://iwenwiki.com",
    timeout: 5000
})
/*处理拦截器*/
/*请求拦截*/
instance.interceptors.request.use(
    config => {
        if (config.method === "post") {
            // config.data = qs.stringify(config.data)
        }//RFtokenExpired
        if (localStorage.getItem('access_token') && localStorage.getItem("getTokenFlag") != "ACtokenExpired" && localStorage.getItem("getTokenFlag") != "RFtokenExpired") {
            console.log(" 拦截request, Authorization = Bearer,带ACtoken发请求")
            config.headers.Authorization = "Bearer " + localStorage.getItem('access_token');
            config.headers['Content-Type'] = "application/json"
        } else {
            console.log(" 拦截request, Authorization = Basic,通过code取ACtoken和通过rftoken取ACtoken")
            config.headers.Authorization = 'Basic d3NlLWVzaG9wLXczOndzZS1lc2hvcC13My1zZWNyZXQ=';
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return config
    },
    error => Promise.reject(error)
)

/*响应拦截*/
instance.interceptors.response.use(
    // 完成了
    response => {
        if (response.status === 200 || response.status === 201) {
            return response
        } else {
            errorHandle(response.status, response.info);
        }
        // response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
    },
    error => {
        console.log(error)
        const { response } = error;
        if (response) {
            //这里返回的就是页面要的数据,跟上面的 return response 效果相同
            //error.response.config 包含发送请求的所有信息
            return Promise.resolve(errorHandle(response.status, response.info, error.response.config))
        } else {
            alert("no response was returned from server.please check the error MSG from console.")
            ClearLocalStorage();
            window.location.href = "/SSOlogin"
            // gotoSSO();
        }
    }
)

export default instance
```