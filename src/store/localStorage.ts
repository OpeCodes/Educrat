export const addUserLocalStorage =(user: any)=>{
    localStorage.setItem("user",JSON.stringify(user));
}
// export const removeUserFromLocalStorage = ()