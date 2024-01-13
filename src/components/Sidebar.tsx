import React from "react";
import { Box, VStack } from "@chakra-ui/react";
interface SidebarProps {
  isExpanded: boolean;
  onHover: (isHovered: boolean) => void;
}
import { MdPayment, MdOutlineNotificationsNone,  } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { NavItem } from "./NavItem";
import { FaYoutube } from "react-icons/fa6";

const links = [
  {
    name: "courses",
    href: "courses",
    icon: FaYoutube,
  },
  {
    name: "Payment",
    href: "/payment",
    icon: MdPayment,
  },
  {
    name: "Notification",
    href: "/notification",
    icon: MdOutlineNotificationsNone,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: IoSettingsOutline,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onHover }) => {
  return (
    <>
      <Box
        display={{ base: "none", md: "flex" }}
        w={isExpanded ? "250px" : "50px"}
        bg="gray.200"
        p="4"
        h="100vh"
        transition="width 0.3s"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <VStack spacing={4} align="left">
          <Box>
            {links.map((link, i) => (
              <Box key={i}>
                <NavItem to={link.href} icon={link.icon} key={i}>
                  {isExpanded && <> {link.name}</>}
                </NavItem>
              </Box>
            ))}
          </Box>
        </VStack>
      </Box>
     
    </>
  );
};

export default Sidebar;
