import { Flex, Image, Stack, Box, Text, Badge, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FiSearch } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";

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
  return (
    <Stack>
      <Flex
        bg={"#140342"}
        p={4}
        width={"100%"}
        justify={"space-between"}
        align={"center"}
      >
        <Flex>
          <Box width={"160px"}>
            <Image
              src={logo}
              alt="Dan Abramov"
            />
          </Box>
        </Flex>
        <Flex columnGap={4} color={"white"}>
          {links.map(({ id, name, href }) => (
            <Box
              paddingX={"10px"}
              borderRadius={5}
              paddingY={"2px"}
            //   _hover={{ background: "blue" ,}}
              transition={"all"}
            >
              <NavLink
                to={href}
                key={id}
                style={({ isActive, }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#4f547b" : "white",
                    //   viewTransitionName: isTransitioning ? "slide" : "",
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
              //   fontSize="sm"
              //   px={1}
              // p={1}
              textAlign={"center"}
            >
              10
            </Badge>
          </Box>
          <Button color="#ffffff" variant="link">
            Log In
          </Button>
          <Button
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
    </Stack>
  );
};

export default Navbar;
