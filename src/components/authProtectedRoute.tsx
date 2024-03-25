// // authProtectedRoute.tsx
// import React, { useEffect } from 'react';
// import { useNavigate,redirect } from 'react-router-dom';
// import { isTokenExpired } from './jwtUtils'; // You need to implement this utility

// const AuthProtectedRoute: React.FC = ({ children } : any) => {
// //   const history = useHistory();

//   useEffect(() => {
//     const jwt = localStorage.getItem('jwt'); // Assuming your JWT is stored in localStorage
//     if (jwt && isTokenExpired(jwt)) {
//       // Redirect to login page if token is expired
//     //   history.push('/login');
//       redirect('/sign-in');
//     }
//   }, [history]);

//   return <>{children}</>;
// };

// export default AuthProtectedRoute;
