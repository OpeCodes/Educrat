import {
  Box,
  Text,
  Flex,
  Divider,
  Heading,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
// import logo from "../assets/footer-logo.svg";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";
import { BiGlobe } from "react-icons/bi";
import { footerLinksData } from "../utils/data";

export const Footer = () => {
  return (
    <Box
      as={"section"}
      px={{ base: "6", md: "12", lg: "16" }}
      pt={16}
      pb={8}
      // bgColor={"#6440fb"}
      bg={"#1A064F"}
    >
      <Box
        as={"div"}
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        alignItems={{ base: "start", md: "center" }}
        w={"full"}
      >
        <Box color={"white"}>
          {/* <img src={logo} alt="educrat-logo" /> */}
          <Stack>
            <Text fontSize={"1.7rem"} fontWeight={"bold"} color={"blue"}>DevUpshot</Text>
          </Stack>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"start"}
          mt={{ base: 6 }}
        >
          <Text color={"white"} fontSize={"16px"} mr={8}>
            Follow us on social media
          </Text>
          <Flex color={"white"} cursor={"pointer"}>
            <FaFacebookF size={16} />
            <Box as={"span"} mx={8}>
              <FaTwitter size={16} />
            </Box>
            <Box as={"span"} mr={8}>
              <FaInstagram size={16} />
            </Box>
            <FaLinkedinIn size={16} />
          </Flex>
        </Box>
      </Box>
      <Divider color={"rgba(255,255,255,0.15)"} opacity={0.3} my={12} />
      <Box
        as="div"
        display={{ base: "grid", md: "flex" }}
        gridTemplateColumns={{ base: "repeat(1,1fr)" }}
      >
        {footerLinksData.map(({ id, title, links }) => {
          return (
            <Box
              as="div"
              w={{ base: "100%", md: "25%" }}
              mb={{ base: 6 }}
              key={id}
            >
              <Heading
                as={"h3"}
                color={"white"}
                fontWeight={600}
                fontSize={"18px"}
              >
                {title.toLocaleUpperCase()}
              </Heading>
              {links.map(({ id, name }) => {
                return (
                  <Text
                    as={"p"}
                    color={"white"}
                    fontSize={"16px"}
                    cursor={"pointer"}
                    my={4}
                    key={id}
                  >
                    {name}
                  </Text>
                );
              })}
            </Box>
          );
        })}
        <Box as={"div"} w={{ base: "100%", md: "25%" }} position={"relative"}>
          <Heading as={"h3"} color={"white"} fontWeight={600} fontSize={"18px"}>
            GET IN TOUCH
          </Heading>
          <Text as={"p"} color={"white"} fontSize={"16px"} my={4}>
            We don’t send spam so don’t worry.
          </Text>
          <Input
            placeholder="Email..."
            bg={"white"}
            color={"gray.600"}
            border={"none"}
            borderRadius={"full"}
            focusBorderColor="#6440fb"
            px={6}
            py={8}
          />
          <Button
            position={"absolute"}
            top={{ base: "63%", md: "19%", lg: "15%" }}
            right={{ base: "3%", md: "5%" }}
            p={5}
            bg="#6440fb"
            color="white"
            variant="solid"
            borderColor={"#6440fb"}
            borderWidth={1}
            borderRadius={"full"}
            zIndex={3}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Divider color={"rgba(255,255,255,0.15)"} opacity={0.3} my={8} />
      <Box
        as={"div"}
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        alignItems={{ base: "start", md: "center" }}
      >
        <Box as="div">
          <Text as={"p"} color={"white"} fontSize={"16px"}>
            &copy; {new Date().getFullYear()} DevUpshot. All Right Reserved.
          </Text>
        </Box>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent={"center"}
          alignItems={{ base: "start", md: "center", lg: "center" }}
        >
          <Text as={"p"} color={"white"} fontSize={"16px"} my={{ base: 3 }}>
            Help
          </Text>
          <Text
            as={"p"}
            color={"white"}
            fontSize={"16px"}
            mx={{ md: 4 }}
            mb={{ base: 3, md: 0 }}
          >
            Privacy Policy
          </Text>
          <Text
            as={"p"}
            color={"white"}
            fontSize={"16px"}
            mb={{ base: 3, md: 0 }}
          >
            Cookie Notice
          </Text>
          <Text
            as={"p"}
            color={"white"}
            fontSize={"16px"}
            mx={{ md: 4 }}
            mb={{ base: 3, md: 0 }}
          >
            Security
          </Text>
          <Text
            as={"p"}
            color={"white"}
            fontSize={"16px"}
            mb={{ base: 3, md: 0 }}
          >
            Terms of Use
          </Text>
          <Button
            variant={"outline"}
            ml={{ md: 4 }}
            px={8}
            py={6}
            bg={"#140342"}
            color={"white"}
            borderColor={"#140342"}
            borderWidth={2}
            borderRadius={"full"}
            fontWeight={"normal"}
            leftIcon={<BiGlobe size={22} />}
            _hover={{ bg: "white", color: "#140342" }}
          >
            English
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
