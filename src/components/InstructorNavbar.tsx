import { Avatar, Flex, Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IoMdNotificationsOutline } from "react-icons/io";

const InstructorNavbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Flex align={"center"} justify={"flex-end"} columnGap={4} m={4} pr={5}>
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
  );
};

export default InstructorNavbar;
