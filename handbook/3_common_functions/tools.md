
```js
/**
 * Returns a format price with symbol
 *
 * Example Usage:
 * formatPrice(price, "$");
 *
 * @param string num, symbol.
 * @return string - format price with symbol.
 */

export function formatPrice(num,symbol){
    var symbol = symbol?symbol:"$"
    var result = [], counter = 0;
    num = (num || 0).toString().split("")

    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i])
        if (!(counter % 3) && i != 0) {
            result.unshift(',');
        }
    }
    return symbol+" "+result.join("")
     
}
```


```js
/**
 * Returns format date
 *
 * Example Usage:
 * formatDate(new Date(),'yyyy-MM-dd');
 *
 * @param object mydate, fmt
 * @return string - format date.
 */

export function formatDate(mydate,fmt){
  var o = {
    "M+":  mydate.getMonth() + 1,  // 月份 
    "d+":  mydate.getDate(),  // 日 
    "h+":  mydate.getHours(),  // 小时 
    "m+":  mydate.getMinutes(),  // 分 
    "s+":  mydate.getSeconds(),  // 秒 
    "q+": Math.floor(( mydate.getMonth() + 3) / 3),  // 季度 
    "S":  mydate.getMilliseconds()  // 毫秒 
};
 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ( mydate.getFullYear() + "").substr(4 - RegExp.$1.length));
 for ( var k  in o)
 if ( new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
}
```

```js
/**
 * Returns format date
 *
 * Example Usage:
 * formatDate(new Date(),'yyyy-MM-dd');
 *
 * @param object mydate, fmt
 * @return string - format date.
 */

//mydate = 2022-07-15
export function formatToDate(mydate,fmt){
  fmt=fmt?fmt:"yyyy-MM-dd"
  let newdate = new Date();
  try {
    let mydateArr = mydate.split("T")[0].split("-");
    if(mydateArr.length>0){
      newdate.setFullYear(mydateArr[0],mydateArr[1]-1,mydateArr[2]);
    }
  } catch (error) {
    console.log("formatToDate error : "+error)
  }
  return newdate;
}
```

```js
/**
 * Set state of the email error text
 *
 * Example Usage:
 * checkEmailIFD(email,id,emptyValue,emailFormatInvalid,(obj)=>{this.setState(obj)});
 *
 * @param string fieldValue,fieldID,emptyValue,emailFormatInvalid,setState.
 * @return string - email error text.
 */

export function checkEmailIFD(fieldValue,fieldID,emptyValue,emailFormatInvalid,setState){
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let res=undefined;
    let emailErrorText ="";
    if(fieldValue === ""){
      res=true;
      emailErrorText = fieldID + emptyValue;
    }else if(!pattern.test(fieldValue)){
      res=true;
      emailErrorText = fieldID + emailFormatInvalid;
    }
    setState({emailErrorText: emailErrorText })
    return res;
   }
```



```js
/**
 * Set state of the email error text
 *
 * Example Usage:
 * checkCharactersLimitation(
                20,
                fieldValue,
                id,
                emptyValue,
                exceedCharactorLimitation,
                (obj)=>{setMaincategoryIdErrorText(obj.ErrorText)}
                );
 *
 * @param string Limitation,fieldValue,fieldID,emptyValue,exceedErrorText,setState.
 * @return string - email error text.
 */

   export function checkCharactersLimitation(Limitation,fieldValue,fieldID,emptyValue,exceedErrorText,setState){
    let res=undefined;
    let ErrorText ="";
    if(fieldValue === "" || !fieldValue){
        res=true;
        ErrorText = fieldID + emptyValue;
      }else if(fieldValue.length > Limitation){
        res=true;
        ErrorText = fieldID + exceedErrorText;
      }
      setState({ ErrorText })
    return res;
   }
```

```js
/**
 * Returns a url with necessary info
 *
 * Example Usage:
 * window.location.href = getSSOurl();
 *
 * @return string - url.
 */

export function getSSOurl(){
    // const TOKEN = localStorage.getItem('access_token');
    const AUTHSERVICE_PARAMS_client_id= "wse-eshop-w3"
    const AUTHSERVICE_PARAMS_response_type= "token"
    const AUTHSERVICE_PARAMS_scope= "all"
    const AUTHSERVICE_PARAMS_state= "123"//Math.random()
    let AUTHSERVICEURL= "https://wse-dev-nonprod.ocean.ibm.com/ocean/tools/wse/eshop/auth-service/auth/login?";
    const currentHost = window.location.hostname;
    if(currentHost==='w3-pre.ibm.com'){
        AUTHSERVICEURL= "https://w3-pre.ibm.com/ocean/tools/wse/eshop/auth-service/auth/login?";
    }else if(currentHost==='w3.ibm.com'){
        AUTHSERVICEURL= "https://w3.ibm.com/ocean/tools/wse/eshop/auth-service/auth/login?";
    }

    let Protocol = window.location.protocol+"//";
    let port ="";
    let pathname = "/ocean/tools/wse/eshop";
    let hostname = window.location.hostname;
    if(hostname==="127.0.0.1" || hostname==="localhost"){
        port=":"+window.location.port
        pathname="";
    }
    if(hostname=="wse-test-nonprod.ocean.ibm.com")hostname = "w3-pre.ibm.com";//use corporate URL in TEST env
    let AUTHSERVICE_PARAMS_redirect_uri = Protocol+hostname+port+pathname;
    const url = AUTHSERVICEURL+"client_id="+AUTHSERVICE_PARAMS_client_id+'&redirect_uri='+AUTHSERVICE_PARAMS_redirect_uri+'/RedirectPage&response_type=code'+'&scope='+AUTHSERVICE_PARAMS_scope+'&state='+AUTHSERVICE_PARAMS_state+'&grant_type=authorization_code';

    // https://wse-dev-nonprod.ocean.ibm.com/ocean/tools/wse/eshop/auth-service/auth/login?client_id=wse-eshop-w3&redirect_uri=http://localhost:3000/RedirectPage&response_type=code&scope=all&state=123&grant_type=authorization_code
    // alert(url)
    return url
    // console.log(url)
    // window.location.href = url;//这里应该打开，URL是我们的auth server地址
  }
```

  ```js
  /**
   * Example Usage:
   * ClearLocalStorage();
   */

  export function ClearLocalStorage(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("getTokenFlag");
    localStorage.removeItem("SSOcode");
    localStorage.removeItem("SSOprePathname");
  }
  ```