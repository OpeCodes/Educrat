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
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FiSearch } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";
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
          <Text cursor={"pointer"}>
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
            justifyContent={"space-between"}
          >
            <Text>Basic side</Text>
            <Box display={{ base: "block", md: "none" }}>
              <DrawerCloseButton bg="white" borderRadius={"100%"} />
            </Box>
          </DrawerHeader>

          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default Navbar;
