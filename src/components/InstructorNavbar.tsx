import { Avatar, Flex, Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdMenu } from "react-icons/md";

const InstructorNavbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Flex align={"center"} justify={{base: "space-between", md: "flex-end"}}  m={4} pr={3} w={"100%"}>
       <Box
    
        cursor={"pointer"}
        display={{ base: "flex", md: "none" }}
      >
        <MdMenu fontSize={40} />
      </Box>
      <Flex align={"center"} columnGap={4}>
      <Text as={"button"} fontWeight={"500"}>Student</Text>
      <Box cursor={"pointer"}>
        <IoMdNotificationsOutline fontSize={20} />
      </Box>
      <Avatar
        name={`${user.user.firstName} ${user.user.lastName}`}
        size="sm"
        fontWeight="bold"
        bg="black"
        color="white"
        cursor="pointer"
      />
      </Flex>
    </Flex>
  );
};

export default InstructorNavbar;
