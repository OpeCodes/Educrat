import { Box, Icon, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

import { Link, useResolvedPath, useMatch } from "react-router-dom";

interface IProps {
  icon?: IconType | ReactNode | any;
  children: any;
  to: string;
}

export const NavItem = ({ icon, children, to }: IProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath?.pathname, end: true });

  return (
    <Box
      as={Link}
      to={to}
      display="flex"
      alignItems="center"
      mb={3}
      px={4}
      py={3}
      borderRadius="16px"
      w="full"
      textAlign="left"
      color={isActive ? "#6440fb" : "#4f547b"}
      fontWeight={isActive ? "bold" : "medium"}
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
      <Icon as={icon} boxSize={5} mr={4} />
      <Text textTransform="capitalize">{children}</Text>
    </Box>
  );
};
