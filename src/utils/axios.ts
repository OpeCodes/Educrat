import axios from "axios";
import { getUserLocalStorage } from "../store/localStorage";

 const customFetch = axios.create({
    baseURL: "https://educrat-be.onrender.com/api/v1"
})

customFetch.interceptors.request.use((config)=>{
    const user = getUserLocalStorage();
    if(user){
        config.headers["Authorization"] = `Bearer ${user.accessToken}`
    }
    return config
})
export default customFetch
