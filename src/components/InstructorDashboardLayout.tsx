// InstructorDashboard.tsx
import React, { useState } from 'react';
import { Flex, Box,  IconButton, useMediaQuery } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { AiOutlineMenu } from 'react-icons/ai';
import { Outlet } from 'react-router-dom';
import { InstructorNavbar } from '.';
const InstructorDashboard: React.FC = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isSmallerScreen] = useMediaQuery('(max-width: 768px)');

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <Flex direction="row" h="100vh">
      {/* Sidebar (Hidden on smaller screens) */}
      {!isSmallerScreen && (
        <Sidebar
          isExpanded={isSidebarExpanded}
          onHover={(isHovered) => setSidebarExpanded(isHovered)}
        />
      )}

      {/* Main Content */}
      <Box flex="1">
        {/* Header with Toggle Button */}
        <Flex align="center" justify="space-between"  >
          {isSmallerScreen && (
            <IconButton
              icon={<AiOutlineMenu />}
              aria-label="Toggle Sidebar"
              onClick={toggleSidebar}
              display={{ base: 'block', md: 'none' }}
            />
          )}
          {/* <Heading color="white">Instructor Dashbossssard</Heading> */}
          <Flex width={"100%"} justify={"flex-end"}>
          <InstructorNavbar/>

          </Flex>
        </Flex>

        {/* Courses or other main content */}
        <Box p="4">
          {/* Your main content goes here */}
          <p>Welcome to your Udemy Dashboard!</p>
          <Outlet/>
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
