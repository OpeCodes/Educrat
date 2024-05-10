import {
  Avatar,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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
const InstructorNavbar = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef: any = React.useRef();
  const { user} = useSelector((store: RootState) => store.user);
  return (
    <>
      <Flex
        align={"center"}
        m={4}
        pr={3}
        w={"100%"}
        justify={"end"}
      >
        {/* <Box
          cursor={"pointer"}
          as="button"
          display={{ base: "flex", md: "none" }}
          ref={btnRef}
          onClick={onOpen}
        >
          <MdMenu fontSize={35} />
        </Box> */}
        <Flex align={"center"} columnGap={4}>
          <Text as={Link} to="/" fontWeight={"500"}>
            Student
          </Text>
          {/* <Box cursor={"pointer"}>
            <IoMdNotificationsOutline fontSize={20} />
          </Box> */}
          <Avatar
            name={`${user.user.firstName} ${user.user.lastName}`}
            size="sm"
            fontWeight="bold"
            bg="white"
            color="#140342"
            src={user.user?.profilePicture}
            cursor="pointer"
          />
        </Flex>
        {/* <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Flex columnGap={4} mt={4}>
                <Avatar
                  name={`${data?.firstName} ${data?.lastName}`}
                  size="md"
                  fontWeight="bold"
                  bg="white"
                  color="#140342"
                  src={data?.profilePicture}
                  cursor="pointer"
                />
                <Box>
                  <Text fontWeight={"bold"} fontSize={"18px"}>
                    Hi, {data?.firstName} {data?.lastName}
                  </Text>
                  <Text fontWeight={"400"} fontSize="14px">
                    Welcome back
                  </Text>
                </Box>
              </Flex>
            </DrawerHeader>
            <Divider />
            <DrawerBody>
              <Box p={5}>
                {links.map((link, i) => (
                  <Box key={i} onClick={onClose}>
                    <NavItem to={link.href} icon={link.icon} key={i}>
                      {link.name}
                    </NavItem>
                  </Box>
                ))}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer> */}
      </Flex>
    </>
  );
};

export default InstructorNavbar;
