import { Box, Flex, Text, Heading, Divider, Stack, Image, Avatar } from "@chakra-ui/react";
import { CiPlay1, CiClock1 } from "react-icons/ci";
import { icon3 } from "../assets/export";
import { FaRegStar } from "react-icons/fa6";

type Props = {
  id: number;
  thumbnail: string;
  complexityLevel: string;
  userId: any;
  title: string;
};
const Course = ({
  id,
  thumbnail,
  title,
  complexityLevel,
  userId,
}: Props) => {
  return (
    <Box
      as="div"
      className="wrapper"
      width={{ base: "87vw", md: "345px", lg: "290px" }}
      // width={"290px"}
      height={"auto"}
      cursor={"pointer"}
      key={id}
    >
      <Stack>
        <Box as={"div"} overflow={"hidden"} borderRadius={"10px"}>
          <Image
            src={thumbnail}
            className="img"
            maxH={"200px"}
          height={"100%"}
          
            style={{ borderRadius: "10px" }}
            alt={title}
          />
        </Box>
        <Box>
          <Flex justifyContent={"start"} alignItems={"center"}>
            <Text color={"#e59819"}>4.5</Text>
            <Box color={"#e59819"} display={"flex"} ml={2} mr={3}>
              <Box mr={1}><FaRegStar /></Box>
              <Box mr={1}><FaRegStar /></Box>
              <Box mr={1}><FaRegStar /></Box>
              <Box mr={1}><FaRegStar /></Box>
           
              
            </Box>
            <Text color={"gray.600"}>(1991)</Text>
          </Flex>
        </Box>
        <Heading
          as={"h3"}
          fontSize={"17px"}
          color={"#140342"}
          fontWeight={"normal"}
        >
          {title}
        </Heading>
        <Flex>
          <Box display={"flex"} columnGap={1} justifyContent={"center"} alignItems={"center"}>
            <CiPlay1 size={14} />
            <Box>lesson</Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mx={3}
            columnGap={1}
          >
            <CiClock1  />
            <Box fontSize={"14px"}>22hrs 0mins</Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mx={3}
          >
            <img src={icon3} width={"13px"} height={"13px"} alt="level" />
            <Box fontSize={"14px"} ml={1}>
              {complexityLevel}
            </Box>
          </Box>
        </Flex>
        <Divider colorScheme="#ededed" display={{ base: "none" }} />
        <Box
          display={{ base: "none", lg: "flex" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            columnGap={3}
          >
            <Avatar    size='xs' name={`${userId?.firstName} ${userId.lastName}`} src={userId?.profilePicture}/>
            <Text color={"gray.600"} fontSize={"small"}>
            {`${userId?.firstName} ${userId.lastName}`}
            </Text>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >            
            <Text color={"#140342"} fontSize={"xl"}>
              $99
            </Text>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Course;
