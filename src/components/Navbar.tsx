import {
  Flex,
  Image,
  Stack,
  Box,
  Text,
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Divider,
} from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FiSearch } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter , FaInstagram , FaLinkedinIn } from "react-icons/fa6";


const links = [
  {
    id: 1,
    name: "Home",
    href: ".",
  },
  {
    id: 2,
    name: "Course",
    href: "/course",
  },
  {
    id: 3,
    name: "Events",
    href: "/events",
  },
  {
    id: 4,
    name: "Page",
    href: "/page",
  },
  {
    id: 5,
    name: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: modalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  return (
    <Stack>
      <Flex
        bg={"#140342"}
        p={4}
        width={"100%"}
        justify={"space-between"}
        align={"center"}
      >
        <Flex justify={"space-between"} align={"center"}>
          <Box width={"160px"}>
            <Image src={logo} alt="Dan Abramov" />
          </Box>
        </Flex>
        <Flex
          columnGap={4}
          color={"white"}
          display={{ base: "none", lg: "flex" }}
        >
          {links.map(({ id, name, href }) => (
            <Box
              paddingX={"10px"}
              borderRadius={5}
              paddingY={"2px"}
              //   _hover={{ background: "blue" ,}}
              transition={"all"}
              key={id}
            >
              <NavLink
                to={href}
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#4f547b" : "white",
                  };
                }}
              >
                {name}
              </NavLink>
            </Box>
          ))}
        </Flex>
        <Flex align={"center"} columnGap={5} color="white">
          <Text cursor={"pointer"} onClick={() => onModalOpen()}>
            <FiSearch fontSize={"25px"} />
          </Text>
          <Box position="relative">
            <Text cursor={"pointer"}>
              <IoCartOutline fontSize={"25px"} />
            </Text>
            <Badge
              position="absolute"
              top="-4"
              right="-3"
              borderRadius="100%"
              bg="red.500"
              color="white"
              textAlign={"center"}
            >
              10
            </Badge>
          </Box>
          <Box
            fontSize={"50px"}
            color={"white"}
            cursor={"pointer"}
            display={{ base: "black", lg: "none" }}
            onClick={onOpen}
          >
            <BiMenuAltRight />
          </Box>
          <Button
            color="#ffffff"
            variant="link"
            display={{ base: "none", md: "flex" }}
            as={Link}
            to={"/sign-in"}
          >
            Log In
          </Button>
          <Button
            display={{ base: "none", md: "flex" }}
            px={8}
            bg="white"
            color="black"
            variant="solid"
            borderColor={"white"}
            borderWidth={2}
            _hover={{ background: "#140342", color: "white" }}
            as={Link}
            to={"/sign-up"}
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        size={{ base: "full", sm: "md" }}
      >
        <DrawerOverlay />
        <Box bg="white" p={5} display={{ base: "none", md: "block" }}>
          <DrawerCloseButton bg="white" borderRadius={"100%"} />
        </Box>

        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display={"flex"}
            columnGap={"10px"}
            fontSize={"15px"}
          >
            <Text as={Link} to="/sign-in">
              Login
            </Text>
            <Text as={Link} to="/sign-up">
              Sign Up
            </Text>
            <Box display={{ base: "block", md: "none" }}>
              <DrawerCloseButton bg="white" borderRadius={"100%"} />
            </Box>
          </DrawerHeader>

          <DrawerBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Box>
              {links.map(({ id, name, href }) => (
                <Box
                  paddingX={"10px"}
                  borderRadius={5}
                  paddingY={"2px"}
                  //   _hover={{ background: "blue" ,}}
                  transition={"all"}
                  my={13}
                  key={id}
                >
                  <NavLink
                    to={href}
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "blue" : "black",
                      };
                    }}
                  >
                    {name}
                  </NavLink>
                </Box>
              ))}
            </Box>
            <Divider orientation='horizontal' />
            <Flex rowGap={"25px"} flexDirection={"column"}>
              <Text>Call Us</Text>
              <Text>08145885175</Text>
              <Text>Abule oja</Text>
              <Text>Yaba lagos</Text>
              <Text>adedokunpeter11@gmail.com</Text>
            </Flex>
            <Flex mb="15px" columnGap={7} cursor={"pointer"}>
            <FaFacebookF  />
            <FaTwitter />
            <FaInstagram />
          <  FaLinkedinIn />
            </Flex>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal onClose={onModalClose} size={"full"} isOpen={modalOpen}>
        <ModalOverlay />
        <ModalContent pt={20}>
          <ModalHeader>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                <FiSearch fontSize={"25px"} />
              </InputLeftElement>
              <Input
                placeholder="What do you want to learn?"
                variant="flushed"
              />
              <InputRightElement pb={10}>
                <Box bg="white">
                  <ModalCloseButton borderRadius={"100%"} />
                </Box>
              </InputRightElement>
            </InputGroup>
          </ModalHeader>
          <ModalBody>
            <Text>Popular Right now</Text>
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onModalClose}>Close</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Navbar;
