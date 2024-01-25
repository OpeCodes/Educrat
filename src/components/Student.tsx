import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";

type Student = {
  id: number;
  img: string;
  name: string;
  job: string;
};
const Student = ({ id, img, name, job }: Student) => {
  return (
    <Card key={id} p={3} mb={{ base: 8 }}>
      <CardHeader
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img src={img} alt="name" />
        <Text color={"#140342"} fontSize={"18px"} my={2}>
          {name}
        </Text>
        <Text color={"gray.600"} fontSize={"14px"}>
          {job}
        </Text>
      </CardHeader>
      <CardBody mt={-4}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          color={"gray.700"}
          mb={4}
        >
          <FaFacebookF size={16} />
          <Box as={"span"} mx={4}>
            <FaInstagram size={16} />
          </Box>
          <Box as={"span"} mr={4}>
            <FaTwitter size={16} />
          </Box>
          <FaLinkedinIn size={16} />
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} wrap={"wrap"}>
          <Box
            as={"div"}
            borderColor={"gray.300"}
            borderWidth={"1px"}
            py={2}
            px={5}
            borderRadius={"full"}
            fontSize={"14px"}
            color={"gray.600"}
            mr={4}
          >
            Design
          </Box>
          <Box
            as={"div"}
            borderColor={"gray.300"}
            borderWidth={"1px"}
            py={2}
            px={5}
            borderRadius={"full"}
            fontSize={"14px"}
            color={"gray.600"}
          >
            Art
          </Box>
          <Box
            as={"div"}
            borderColor={"gray.300"}
            borderWidth={"1px"}
            py={2}
            px={5}
            borderRadius={"full"}
            fontSize={"14px"}
            color={"gray.600"}
            my={2}
          >
            Graphic
          </Box>
        </Flex>
      </CardBody>
      <CardFooter
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          variant={"outline"}
          px={12}
          py={6}
          color={"#6440fb"}
          borderColor={"#6440fb"}
          borderWidth={2}
          borderRadius={"full"}
          _hover={{ bg: "#6440fb", color: "white" }}
          fontWeight={"normal"}
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};
export default Student;
