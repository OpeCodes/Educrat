import { Box, Text } from "@chakra-ui/react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

interface IProps {

  children: any;
  to: string;
}

export const CourseManageNavItem = ({ children, to }: IProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath?.pathname, end: true });

  return (
    <Box
      as={Link}
      to={to}
      display="flex"
      alignItems="center"
      w="full"
      px={4}
      py={3}
      borderRadius="16px"
      textAlign="left"
      color={isActive ? "#6440fb" : "#4f547b"}
      bg={isActive ? "rgba(100,64,251,0.1)" : "transparent"}
      border="1px solid"
      borderColor={isActive ? "rgba(100,64,251,0.16)" : "transparent"}
      transition="all 0.2s ease"
      _hover={{
        bg: "rgba(100,64,251,0.08)",
        color: "#140342",
        transform: "translateX(4px)",
      }}
    >
      <Text fontWeight={isActive ? 700 : 500}>{children}</Text>
    </Box>
  );
};
