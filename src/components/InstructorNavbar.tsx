import { Avatar, Flex, Box, Text,  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button, } from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { useGetUser } from "../hooks";
import React from "react";

const InstructorNavbar = () => {
  const { data } = useGetUser();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef:any = React.useRef()
  return (
    <>
     
    <Flex
      align={"center"}
      justify={{ base: "space-between", md: "flex-end" }}
      m={4}
      pr={3}
      w={"100%"}
    >
      <Box cursor={"pointer"} as="button" display={{ base: "flex", md: "none" }} ref={btnRef} onClick={onOpen}>
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
        placement='left'
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
    </>

  );
};

export default InstructorNavbar;
