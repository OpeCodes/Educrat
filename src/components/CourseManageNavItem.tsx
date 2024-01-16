import { Box, } from "@chakra-ui/react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

interface IProps {

  children: any;
  to: string;
}

export const CourseManageNavItem = ({  children, to }: IProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath?.pathname, end: true });
  return (
    <Box _before={{ background: "red" }}>
      <Box
        as={Link}
        to={to}
        display={"flex"}
        alignItems={"center"}
        w="full"
        textAlign={"left"}
        justifyContent={"space-between"}
        color={isActive ? "#140342" : "black"}
        fontWeight={isActive ? "500" : ""}
      >
        <Box display={"flex"}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
