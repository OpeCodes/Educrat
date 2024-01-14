import {
  Avatar,
  Flex,
  Box,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { useGetUser } from "../hooks";
import React from "react";
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
const InstructorNavbar = () => {
  const { data } = useGetUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = React.useRef();
  return (
    <>
      <Flex
        align={"center"}
        justify={{ base: "space-between", md: "flex-end" }}
        m={4}
        pr={3}
        w={"100%"}
      >
        <Box
          cursor={"pointer"}
          as="button"
          display={{ base: "flex", md: "none" }}
          ref={btnRef}
          onClick={onOpen}
        >
          <MdMenu fontSize={35} />
        </Box>
        <Flex align={"center"} columnGap={4}>
          <Text as={"button"} fontWeight={"500"}>
            Student
          </Text>
          <Box cursor={"pointer"}>
            <IoMdNotificationsOutline fontSize={20} />
          </Box>
          <Avatar
            name={`${data?.firstName} ${data?.lastName}`}
            size="sm"
            fontWeight="bold"
            bg="white"
            color="#140342"
            src={data?.profilePicture}
            cursor="pointer"
          />
        </Flex>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          // finalFocusRef={btnRef}
        >
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
            <Text fontWeight={"bold"} fontSize={"18px"}>Hi, {data?.firstName} {data?.lastName}</Text>
            <Text fontWeight={"400"} fontSize="14px">Welcome back</Text>
          </Box>
              </Flex>
            </DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};

export default InstructorNavbar;
