import { setLocalStorage, getFromLocalStorage } from './local-storage';
const ENC_KEY = '2bdVweTeI42s5mkLdYHyklTMxQS5gLA7MDS6FA9cs1uobDXeruACDic0YSU3si04JGZe4Y';
const BASE_URL = process.env.REACT_APP_API;

const makeRequest = async ({ url, method, data = null, enctype=null}) => {
    url = BASE_URL + url;
    let headers = {
       "accept": "*/*"
    };

    const toFormData = (o) => {
      let fd = new FormData();
      for(const name in o){
        if(name.includes('url')){
          if(Array.isArray(o[name])){
            let fname = name + "[]" ;
            for(let i=0; i< o[name].length; i++){

              fd.append(fname , o[name][i], o[name][i].name);
            };
          } else {
            fd.append(name, o[name], o[name].name);
          }
        } else {
          fd.append(name, o[name]);
        }
      }
      return fd;
    }

    let user = getFromLocalStorage('user');

    const updateUserSession = () => {
        if(user){
           setLocalStorage('user', user);
        }
    }

    if(!enctype?.includes('multipart')){ 
      headers = { ...headers, ...{"content-type": "application/json"} }
    }

    const token = user?.token;

    if(token){
        headers = { ...headers, ...{Authorization : "Bearer " + token}}
    }
    try {
          let request = {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: headers,
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
          }
          if(data) {
              request['body'] = enctype?.includes('multipart') ? toFormData(data): JSON.stringify(data)
          }
          console.log("making request to ", url )
          const response = await fetch(url, request);
          let result = await response.json();
          let status = response?.status;
          return [status, result];
    } catch(err){
        let status = err.response?.status,
            result = err.response?.data;
        return [status, result]
    } finally  {
        updateUserSession();
    }
};

export default makeRequest;

