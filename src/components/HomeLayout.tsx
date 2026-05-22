import { useEffect } from "react";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";

const HomeLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box className="page-shell" minH="100vh">
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default HomeLayout;
