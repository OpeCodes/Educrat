import axios from "axios";
import { getUserLocalStorage,  } from "../store/localStorage";
const customFetch = axios.create({
  baseURL: "https://educrat.onrender.com/api/v1"
});

customFetch.interceptors.request.use((config) => {
  
  const user = getUserLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.accessToken}`;
  }
  return config;
});

// customFetch.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const { status, data } = error.response;
//     const navigate = useNavigate()
//     console.log()
//     if (status === 500 && data.error === "jwt expired") {
//       removeUserFromLocalStorage();    
//       navigate("/sign-in")

//       // Redirect to login or take appropriate action
//     }
//     return Promise.reject(error);
//   }
// );

// customFetch.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // const originalRequest = error.config;
//     const navigate = useNavigate()
//     const user = getUserLocalStorage();  
//     if (error.response && error.response.status === 500) {
//       const refreshToken = user.accessToken;
//       if (refreshToken) {      
//         removeUserFromLocalStorage();
//         navigate("/sign-in"); 
//       } else {        
//         removeUserFromLocalStorage(); 
//         navigate("/sign-in"); 
//       }
//     }
//     return Promise.reject(error);
//   }
// );

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
