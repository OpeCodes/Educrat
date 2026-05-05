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
import { MotionBox, fadeUp, popIn, stagger } from "../components/motion";
import { motion } from "framer-motion";

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
        <Box color={"white"} alignItems={"center"}>
          <Stack spacing={2}>
            <Text fontSize={"1.7rem"} fontWeight={"bold"} color={"#6440fb"}>
              DevUpshot
            </Text>
            <Text color={"whiteAlpha.700"} fontSize={"sm"} maxW={"260px"}>
              Project-based learning for engineers who want to ship.
            </Text>
          </Stack>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text color={"white"} fontSize={"16px"} mr={8}>
            Follow us on social media
          </Text>
          <MotionBox
            display={"flex"}
            color={"white"}
            cursor={"pointer"}
            variants={stagger(0.08)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: true }}
          >
            {[
              { Icon: FaFacebookF, href: "#" },
              { Icon: FaTwitter, href: "#" },
              {
                Icon: FaInstagram,
                href: "https://www.instagram.com/devupshot/?igsh=MWR4Z3hxaGhmbmplMw%3D%3D",
              },
              {
                Icon: FaLinkedinIn,
                href: "https://www.linkedin.com/company/devupshot/",
              },
            ].map(({ Icon, href }, idx) => (
              <motion.a
                key={idx}
                href={href}
                target={"_blank"}
                rel={"noreferrer"}
                style={{
                  display: "inline-flex",
                  marginLeft: idx === 0 ? 0 : 32,
                }}
                variants={popIn}
                whileHover={{ y: -4, scale: 1.2, color: "#a78bfa" }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </MotionBox>
        </Box>
      </Box>
      <Divider color={"rgba(255,255,255,0.15)"} opacity={0.3} my={12} />
      <MotionBox
        as="div"
        display={{ base: "grid", md: "flex" }}
        gridTemplateColumns={{ base: "repeat(1,1fr)" }}
        variants={stagger(0.1)}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {footerLinksData.map(({ id, title, links }) => {
          return (
            <MotionBox
              as="div"
              w={{ base: "100%", md: "25%" }}
              mb={{ base: 6 }}
              key={id}
              variants={fadeUp}
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
                  <motion.p
                    key={id}
                    style={{
                      color: "white",
                      fontSize: "16px",
                      cursor: "pointer",
                      margin: "16px 0",
                    }}
                    whileHover={{ x: 6, color: "#a78bfa" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {name}
                  </motion.p>
                );
              })}
            </MotionBox>
          );
        })}
        <Box as={"div"} w={{ base: "100%", md: "25%" }} position={"relative"}>
          <Heading as={"h3"} color={"white"} fontWeight={600} fontSize={"18px"}>
            GET IN TOUCH
          </Heading>
          <Text as={"p"} color={"white"} fontSize={"16px"} my={4}>
            Get new course drops and engineering tips. No spam, ever.
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
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
      </MotionBox>
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
