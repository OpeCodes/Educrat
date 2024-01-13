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
    <Box
      as={Link}
      to={to}
      display={"flex"}
      alignItems={"center"}
      mb="30px"
      w="full"
      textAlign={"left"}
      justifyContent={"space-between"}
      color={isActive ? "#7B58F4" : "#808080"}
      _after={{
        content: '""',
        height: `${isActive ? "2px" : ""}`,
        borderStyle: `${isActive ? "solid" : ""}`,
        borderWidth: `${isActive ? "10px 0 10px 7px" : ""}`,
        borderColor: `${
          isActive ? "transparent transparent transparent #7B58F4" : ""
        }`,
        transform: "scaleX(-1)",
      }}
    >
      <Box display={"flex"}>
        <Icon as={icon} boxSize={6} mr={"1.5rem"} />
        {children}
      </Box>
    </Box>
  );
};
