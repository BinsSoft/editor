import appConfig from '../config';
import Axios from 'axios';
const HTTPRequest = (endPoint=null, method='GET', body=null)=>{
    let url = appConfig.API_URL+''+endPoint;
    if (endPoint.includes('http')) {
        url = endPoint;
    }
    let requestObj = null;
    let headers = {
        headers: {}
    }
    if (sessionStorage.getItem('_token')) {
        headers.headers['Authorization'] = 'Bearer '+sessionStorage.getItem('_token');
    }
    if (method == 'GET') {
        requestObj =  Axios.get(url)
    } else if(method == 'POST'){
        requestObj =  Axios.post(url, body, headers);
    }
    return requestObj.then((response)=>response.data);
}
const getFormData = (formName)=>{
    let form = document.querySelector('form[name="'+formName+'"]');
    if (form) {
        let formData = Object.fromEntries(new FormData(form).entries());
        return formData;
    }
    return true;
}
const APIService = {
    HTTPRequest : HTTPRequest,
    getFormData: getFormData
};
export default APIService