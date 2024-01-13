import { Box, Icon } from "@chakra-ui/react";
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
    <Box _before={{ background: "red" }}>
      <Box
        as={Link}
        to={to}
        display={"flex"}
        alignItems={"center"}
        mb="30px"
        w="full"
        textAlign={"left"}
        justifyContent={"space-between"}
        color={isActive ? "#140342" : "black"}
        fontWeight={isActive ? "bold" : ""}
      >
        <Box display={"flex"}>
          <Icon as={icon} boxSize={6} mr={"1.5rem"} />
          {children}
        </Box>
      </Box>
    </Box>
  );
};
