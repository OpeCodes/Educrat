// InstructorDashboard.tsx
import React, { useState } from 'react';
import { Flex, Box, Heading } from '@chakra-ui/react';
import Sidebar from './NavItem';
// import Sidebar from './Sidebar';

const InstructorDashboard: React.FC = () => {
  const [isSidebarHovered, setSidebarHovered] = useState(false);

  return (
    <Flex direction="row" h="100vh">
      {/* Sidebar */}
      <Sidebar onHover={setSidebarHovered} isSidebarHovered={isSidebarHovered} />

      {/* Main Content */}
      <Box flex="1" p="4">
        {/* Header */}
        <Flex align="center" justify="space-between" p="4" bg="teal.500">
          <Heading color="white">Instructor Dashboard</Heading>
        </Flex>

        {/* Courses or other main content */}
        <Box p="4">
          {/* Your main content goes here */}
          <p>Welcome to your Udemy Dashboard!</p>
        </Box>
      </Box>
    </Flex>
  );
};

export default InstructorDashboard;
