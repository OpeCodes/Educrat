import { useEffect } from "react";
import Navbar from "./Navbar";
import {Outlet, useLocation} from "react-router-dom"
const HomeLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <Navbar />
      <Outlet/>      
    </div>
  )
}

export default HomeLayout
