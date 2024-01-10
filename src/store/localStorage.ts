export const addUserLocalStorage =(user: any)=>{
    localStorage.setItem("user",JSON.stringify(user));
}
export const removeUserFromLocalStorage = () =>{
    localStorage.removeItem("user");
}
export const getUserLocalStorage = () =>{
    const result = localStorage.getItem("user");
    const user = result ? JSON.parse(result) : null;
    return user
}