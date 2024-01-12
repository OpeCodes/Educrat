// Sidebar.tsx
import React, { useState } from 'react';
import { Box, Icon, VStack, Text } from '@chakra-ui/react';
import { AiOutlineDashboard, AiOutlineBook } from 'react-icons/ai';

interface SidebarProps {
  onHover: (isHovered: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onHover }) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Box
      w={isExpanded ? '250px' : '50px'}
      bg="gray.200"
      p="4"
      h="100vh"
      transition="width 0.3s"
      onMouseEnter={() => {
        setExpanded(true);
        onHover(true);
      }}
      onMouseLeave={() => {
        setExpanded(false);
        onHover(false);
      }}
    >
      <VStack spacing={4} align="left">
        <Box>
          <Icon as={AiOutlineDashboard} boxSize={6} />
          {isExpanded && <Text>Dashboard</Text>}
        </Box>
        <Box>
          <Icon as={AiOutlineBook} boxSize={6} />
          {isExpanded && <Text>Courses</Text>}
        </Box>
        {/* Add more sidebar items as needed */}
      </VStack>
    </Box>
  );
};

export default Sidebar;
