import React, { useEffect, useState } from "react";
import { Flex, Box, IconButton, useMediaQuery } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { InstructorNavbar } from ".";
import { useGetUser } from "../hooks";

const InstructorDashboard: React.FC = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const { data: getUser, isPending } = useGetUser();
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
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

  return !hasInstructorRole && !isPending ? (
    <Navigate to={"/"} />
  ) : (
    <Flex direction="row" minH="100vh" className="page-shell">
      {!isSmallerScreen && (
        <Sidebar
          isExpanded={isSidebarExpanded}
          onHover={(isHovered) => setSidebarExpanded(isHovered)}
        />
      )}
      <Box flex="1" bg="transparent">
        <Flex align="center" justify="space-between">
          {isSmallerScreen && (
            <IconButton
              icon={<AiOutlineMenu />}
              aria-label="Toggle Sidebar"
              onClick={toggleSidebar}
              display={{ base: "block", md: "none" }}
              position="fixed"
              top={5}
              left={5}
              zIndex={20}
              borderRadius="16px"
              bg="white"
              boxShadow="0 10px 24px rgba(20,3,66,0.08)"
            />
          )}
          <Flex width={"100%"} justify={"flex-end"}>
            <InstructorNavbar />
          </Flex>
        </Flex>

        <Box px={{ base: 4, md: 6 }} pb={8}>
          <Box
            className="surface-card"
            borderRadius="28px"
            p={{ base: 4, md: 6 }}
            minH="calc(100vh - 120px)"
          >
          <Outlet />
          </Box>
        </Box>
      </Box>

      {isSmallerScreen && (
        <IconButton
          icon={<AiOutlineMenu />}
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
          position="fixed"
          bottom="4"
          right="4"
          display="none"
        />
      )}
    </Flex>
  );
};

export default InstructorDashboard;
