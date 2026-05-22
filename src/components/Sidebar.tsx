import { Box, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { NavItem } from "./NavItem";
import { FaYoutube } from "react-icons/fa";
import logo from "../assets/devupshotLogo.png";
import { MdPayment } from "react-icons/md";
import { Link } from "react-router-dom";
interface SidebarProps {
  isExpanded: boolean;
  onHover: (isHovered: boolean) => void;
}

const links = [
  {
    name: "courses",
    href: "courses",
    icon: FaYoutube,
  },
  {
    name: "Payment",
    href: "payment",
    icon: MdPayment,
  },
  
];

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onHover }) => {
  return (
    <Box
      display={{ base: "none", md: "flex" }}
      w={isExpanded ? "270px" : "88px"}
      bg="rgba(255,255,255,0.82)"
      borderRight="1px solid rgba(20,3,66,0.06)"
      backdropFilter="blur(18px)"
      p={4}
      h="100%"
      position="sticky"
      top={0}
      transition="width 0.25s ease"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <VStack spacing={4} align="stretch" w="full">
        <Box px={2} py={3}>
          {isExpanded ? (
            <Text as={Link} to="/">
              <Image src={logo} height="32px" mb={2} />
            </Text>
          ) : (
            <Box
              w="48px"
              h="48px"
              borderRadius="16px"
              bg="linear-gradient(135deg, rgba(100,64,251,0.12), rgba(14,165,233,0.08))"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontWeight={800} color="#6440fb">
                D
              </Text>
            </Box>
          )}
        </Box>

        <Box>
          {links.map((link, i) => (
            <Box key={i}>
              <NavItem to={link.href} icon={link.icon}>
                {isExpanded ? link.name : ""}
              </NavItem>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;
