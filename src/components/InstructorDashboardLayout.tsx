// InstructorDashboard.tsx
import React, { useState } from "react";
import { Flex, Box, IconButton, useMediaQuery } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import { Navigate, Outlet } from "react-router-dom";
import { InstructorNavbar } from ".";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const InstructorDashboard: React.FC = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isSmallerScreen] = useMediaQuery("(max-width: 100px)");
  const { user } = useSelector((store: RootState) => store?.user);
  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };
  return !user ? (
    <Navigate to={"sign-in"} />
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
