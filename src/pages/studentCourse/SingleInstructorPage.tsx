import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineChat } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";

const SingleInstructorPage = () => {
  return (
    <Stack mt={"4.3rem"}>
      <Stack bg={"#f5f7fe"} py={3}>
        <Flex
          w={"100%"}
          maxW={"90%"}
          mx="auto"
          columnGap={2}
          color={"#4F547B"}
          fontSize={14}
          mt={"0.7rem"}
        >
          <Text as={Link} to="/">
            Home
          </Text>
          <Flex columnGap={1} as={Link} to="/all-courses">
            <Text>&#x2022;</Text>
            <Text>All Courses</Text>
          </Flex>
          <Flex columnGap={1}>
            <Text>&#x2022;</Text>
            <Text>design</Text>
          </Flex>
        </Flex>
      </Stack>
      <Stack color={"white"} mt={4} width={"100%"} bg={"#6440fb"} maxW={"70%"} mx={"auto"} borderRadius={5} py={"5rem"} px={"5rem"}>
      <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
        <Text fontSize={30} fontWeight={"bold"}>Peter Adedokun</Text>
        <Text>Frontend Developer</Text>
        <Flex align={"center"} columnGap={3}>
          <Flex align={"center"} columnGap={1}>

            <Text><AiFillStar size={20}/></Text>
            <Text>Instrutor Rating</Text>

          </Flex>
          
          <Flex align={"center"} columnGap={1}>
            <Text>   <IoPersonOutline /></Text>
            <Text>Students</Text>
          </Flex>
          <Flex align={"center"}>
            <Text>    <HiOutlineChat /></Text>
            <Text>Review</Text>
          </Flex>
          <Flex align={"center"} columnGap={1}>
            <Text><LuClock3 /></Text>
            <Text>course</Text>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default SingleInstructorPage;
