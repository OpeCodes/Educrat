import React, { useEffect, useState } from "react";
import { Flex, Box, IconButton, useMediaQuery } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { InstructorNavbar } from ".";
import { useGetUser } from "../hooks";

const InstructorDashboard: React.FC = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const { data: getUser,isPending } = useGetUser();
  const [isSmallerScreen] = useMediaQuery("(max-width: 100px)");
  const hasInstructorRole = getUser?.roles.some(
    (role: any) => role?.name === "instructor"
  );
  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (!hasInstructorRole && !isPending) ? (
    <Navigate to={"/"} />
  ) : (
    <Flex direction="row" h="100vh">
      {/* Sidebar (Hidden on smaller screens) */}
      {!isSmallerScreen && (
        <Sidebar
          isExpanded={isSidebarExpanded}
          onHover={(isHovered) => setSidebarExpanded(isHovered)}
        />
      )}
      <Box flex="1">
        <Flex align="center" justify="space-between">
          {isSmallerScreen && (
            <IconButton
              icon={<AiOutlineMenu />}
              aria-label="Toggle Sidebar"
              onClick={toggleSidebar}
              display={{ base: "block", md: "none" }}
            />
          )}
          <Flex width={"100%"} justify={"flex-end"}>
            <InstructorNavbar />
          </Flex>
        </Flex>

        <Box p="5">
          <Outlet />
        </Box>
      </Box>

      {/* Sidebar Toggle Button (Visible on smaller screens) */}
      {isSmallerScreen && (
        <IconButton
          icon={<AiOutlineMenu />}
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
          position="fixed"
          bottom="4"
          right="4"
        />
      )}
    </Flex>
  );
};

export default InstructorDashboard;
