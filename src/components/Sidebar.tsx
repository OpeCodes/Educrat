// Sidebar.tsx
import React from 'react';
import { Box, Icon, VStack, Text } from '@chakra-ui/react';
import { AiOutlineDashboard, AiOutlineBook } from 'react-icons/ai';

interface SidebarProps {
  isExpanded: boolean;
  onHover: (isHovered: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onHover }) => {
  return (
    <Box
      w={isExpanded ? '250px' : '50px'}
      bg="gray.200"
      p="4"
      h="100vh"
      transition="width 0.3s"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
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
