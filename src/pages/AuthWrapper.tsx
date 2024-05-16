// import  { useEffect } from 'react';
// import {  logoutUser } from '../features/user/UserSlice';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';

export const AppWrapper = ({children}: any) => {
  // const dispatch = useDispatch();
  // const { user } = useSelector((store: RootState) => store?.user);
  // useEffect(() => {
  //   const checkTokenExpiration = (accessToken: string) => {
  //     if (!accessToken) {
  //       return true;
  //     }
  //     const tokenParts = accessToken.split(".");
  //     if (tokenParts.length !== 3) {
  //       return true;
  //     }
  //     const payload = JSON.parse(atob(tokenParts[1]));
  //     if (!payload.exp) {
  //       return true;
  //     }
  //     const currentTime = Math.floor(Date.now() / 1000); 
  //     return payload.exp < currentTime;
  //   };
  //   const isTokenExpired = checkTokenExpiration(user?.accessToken);
  //   if (isTokenExpired) {
  //     dispatch(logoutUser())
  //   }
  // }, [user]);
  return (
    <div>
      {children}
    </div>
  );
};

