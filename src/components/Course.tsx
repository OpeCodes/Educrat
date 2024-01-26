import { Box, Flex, Text, Heading, Divider, Stack } from "@chakra-ui/react";
import { CiPlay1, CiClock1 } from "react-icons/ci";
import { icon3 } from "../assets/export";

type Props = {
  id: number;
  img: string;
  icon: JSX.Element;
  title: string;
  lesson: string;
  duration: string;
  level: string;
  avatar: string;
  name: string;
  oldPrice: number;
  newPrice: number;
};
const Course = ({
  id,
  img,
  icon,
  title,
  lesson,
  duration,
  level,
  avatar,
  name,
  oldPrice,
  newPrice,
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
          <img
            src={img}
            className="img"
            style={{ borderRadius: "10px" }}
            alt={title}
          />
        </Box>
        <Box>
          <Flex justifyContent={"start"} alignItems={"center"}>
            <Text color={"#e59819"}>4.5</Text>
            <Box color={"#e59819"} display={"flex"} ml={2} mr={3}>
              <Box mr={1}>{icon}</Box>
              <Box mr={1}>{icon}</Box>
              <Box mr={1}>{icon}</Box>
              <Box mr={1}>{icon}</Box>
              <Box>{icon}</Box>
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
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <CiPlay1 size={14} />
            <Box fontSize={"14px"}>{lesson}</Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mx={3}
          >
            <CiClock1 size={14} />
            <Box fontSize={"14px"}>{duration}</Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mx={3}
          >
            <img src={icon3} width={"13px"} height={"13px"} alt="level" />
            <Box fontSize={"14px"} ml={1}>
              {level}
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
          >
            <img src={avatar} style={{ marginRight: "10px" }} alt={name} />
            <Text color={"gray.600"} fontSize={"small"}>
              {name}
            </Text>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text color={"gray.600"} mr={2} textDecoration={"line-through"}>
              ${oldPrice}
            </Text>
            <Text color={"#140342"} fontSize={"xl"}>
              ${newPrice}
            </Text>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Course;
