import axios from "axios";

console.log(import.meta.env.VITE_API_URL);

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
api.interceptors.request.use((config)=>{
   
    //read token from local storage
    const token = localStorage.getItem("token");
    if(token){
        //add to headers of each
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

});
export default api;
