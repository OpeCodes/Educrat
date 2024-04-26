import React from "react";
interface SidebarProps {
  isExpanded: boolean;
  onHover: (isHovered: boolean) => void;
}

// const links = [
//   {
//     name: "courses",
//     href: "courses",
//     icon: FaYoutube,
//   },
//   {
//     name: "Payment",
//     href: "/payment",
//     icon: MdPayment,
//   },
//   {
//     name: "Notification",
//     href: "/notification",
//     icon: MdOutlineNotificationsNone,
//   },
//   {
//     name: "Settings",
//     href: "/settings",
//     icon: IoSettingsOutline,
//   },
// ];

const Sidebar: React.FC<SidebarProps> = () => {
  // { isExpanded, onHover }
  return (
    <>
      {/* <Box
        display={{ base: "none", md: "flex" }}
        w={isExpanded ? "250px" : "50px"}
        bg="gray.200"
        p="4"
        h="100%"
        zIndex={9999}
        // position="fixed"
        transition="width 0.3s"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <VStack spacing={4} align="left" >
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
      </Box> */}
    </>
  );
};

export default Sidebar;
