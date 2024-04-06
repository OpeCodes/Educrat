import axios from "axios";
import { getUserLocalStorage, removeUserFromLocalStorage} from "../store/localStorage";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation

const customFetch = axios.create({
  baseURL: "https://educrat-be.onrender.com/api/v1"
});

customFetch.interceptors.request.use((config) => {
  
  const user = getUserLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.accessToken}`;
  }
  return config;
});

customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // const originalRequest = error.config;
    const navigate = useNavigate()
    const user = getUserLocalStorage();  
    if (error.response && error.response.status === 401) {
      const refreshToken = user.accessToken;
      if (refreshToken) {      
        removeUserFromLocalStorage();
        navigate("/sign-in"); 
      } else {        
        removeUserFromLocalStorage(); 
        navigate("/sign-in"); 
      }
    }
    return Promise.reject(error);
  }
);

export default customFetch;


// import axios from "axios";
// import { getUserLocalStorage } from "../store/localStorage";

//  const customFetch = axios.create({
//     baseURL: "https://educrat-be.onrender.com/api/v1"
// })

// customFetch.interceptors.request.use((config)=>{
//     const user = getUserLocalStorage();
//     if(user){
//         config.headers["Authorization"] = `Bearer ${user.accessToken}`
//     }
//     return config
// })
// export default customFetch
