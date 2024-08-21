import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity, ActivityFormValues } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";

const sleep = (delay : number) => {
    return new Promise ((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5014/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;

}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse; //use ! to tell typescript that it is not null
    switch (status) {
        case 400:
            //toast.error('bad request')
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                router.navigate('/not-found');
            }
            if (data.errors){
                const modelStateErrors : string[] = [];
                for (const key in data.errors){
                    if (data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            } else{
                toast.error(data);
            }
            
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            //toast.error('not found')
            router.navigate('/not-found')
            break;
        case 500:
            //toast.error('server error')
            store.commonStore.setServerError(data);
            router.navigate('/server-error')
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
})

const reponseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    get : <T> (url : string) => axios.get<T>(url).then(reponseBody),
    post : <T> (url : string, body : {}) => axios.post<T>(url, body).then(reponseBody),
    put : <T> (url : string, body : {}) => axios.put<T>(url, body).then(reponseBody),
    delete : <T> (url : string) => axios.delete<T>(url).then(reponseBody)
}

const Activities = {
    list : () => request.get<Activity[]>('/activities'),
    details : (id : string) => request.get<Activity>(`/activities/${id}`),
    create : (activity : ActivityFormValues) => request.post<void>('/activities', activity),
    update : (activity : ActivityFormValues) => request.put<void>(`/activities/${activity.id}`, activity),
    delete : (id : string) => request.delete<void>(`/activities/${id}`),
    attend : (id : string) => request.post<void>(`/activities/${id}/attend`,{})
}

const Account = {
    current : () => request.get<User>('/account'),
    login : (user : UserFormValues) => request.post<User>('/account/login', user),
    register : (user : UserFormValues) => request.post<User>('/account/register', user)
}

const agent = {
    Activities,
    Account
}

export default agent;