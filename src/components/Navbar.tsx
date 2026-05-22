import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Stack,
  Text,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logoutUser } from "../features/user/UserSlice";
import AddToCartButton from "./AddToCartButton";
import { useGetUser } from "../hooks";
import logo from "../assets/devupshotLogo.png";

const links = [
  { id: 1, name: "Home", href: "." },
  { id: 2, name: "Courses", href: "/all-courses" },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hover, setHover] = useBoolean();
  const [isScrolled, setIsScrolled] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store?.user);
  const { data: getUser } = useGetUser();

  const hasInstructorRole = getUser?.roles?.some(
    (role: any) => role?.name === "instructor"
  );
  const hasStudentRole = getUser?.roles?.some(
    (role: any) => role?.name === "student"
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = (closeAfter?: boolean) => {
    toast({
      title: "Logging out",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      dispatch(logoutUser());
      if (closeAfter) onClose();
    }, 2000);
  };

  return (
    <Stack position="fixed" top={0} left={0} right={0} zIndex={30} px={{ base: 4, md: 6, lg: 8 }} pt={4}>
      <Flex
        align="center"
        justify="space-between"
        px={{ base: 4, md: 6, lg: 8 }}
        py={3}
        borderRadius="24px"
        bg={isScrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.74)"}
        border="1px solid"
        borderColor={isScrolled ? "rgba(100,64,251,0.12)" : "rgba(20,3,66,0.06)"}
        boxShadow={isScrolled ? "0 20px 45px rgba(20,3,66,0.12)" : "0 12px 30px rgba(20,3,66,0.06)"}
        backdropFilter="blur(18px)"
        transition="all 0.25s ease"
      >
        <Flex align="center" columnGap={8}>
          <Box as={Link} to="/">
            <Image src={logo} h="32px" />
          </Box>

          <Flex
            display={{ base: "none", lg: "flex" }}
            align="center"
            columnGap={2}
            p={1.5}
            borderRadius="full"
            bg="rgba(100,64,251,0.06)"
            border="1px solid"
            borderColor="rgba(100,64,251,0.08)"
          >
            {links.map(({ id, name, href }) => (
              <NavLink key={id} to={href}>
                {({ isActive }) => (
                  <Box
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight={600}
                    color={isActive ? "white" : "#140342"}
                    bg={isActive ? "#6440fb" : "transparent"}
                    transition="all 0.2s ease"
                    _hover={{ bg: isActive ? "#6440fb" : "white", color: "#6440fb" }}
                  >
                    {name}
                  </Box>
                )}
              </NavLink>
            ))}
          </Flex>
        </Flex>

        <Flex align="center" columnGap={{ base: 2, md: 4 }}>
          {user && !hasInstructorRole && (
            <Text
              fontSize="14px"
              fontWeight={600}
              color="#140342"
              display={{ base: "none", lg: "flex" }}
              as={Link}
              to="/become-instructor"
            >
              Teach on DevUpshot
            </Text>
          )}

          {user && hasStudentRole && hasInstructorRole && (
            <Text
              fontSize="14px"
              fontWeight={600}
              color="#140342"
              display={{ base: "none", lg: "flex" }}
              as={Link}
              to="/instructor/courses"
            >
              Instructor Dashboard
            </Text>
          )}

          <Box display={{ base: "none", md: "block" }}>
            <AddToCartButton />
          </Box>

          <Box
            fontSize="42px"
            color="#6440fb"
            cursor="pointer"
            display={{ base: "flex", lg: "none" }}
            onClick={onOpen}
          >
            <BiMenuAltRight />
          </Box>

          {user ? (
            <Box
              pos="relative"
              onClick={setHover.toggle}
              display={{ base: "none", md: "flex" }}
            >
              <Avatar
                name={`${user.user.firstName} ${user.user.lastName}`}
                size="sm"
                fontWeight="bold"
                bg="white"
                color="#140342"
                src={getUser?.profilePicture}
                cursor="pointer"
                border="2px solid rgba(100,64,251,0.14)"
              />
              {hover && (
                <Box
                  className="surface-card"
                  position="absolute"
                  right="0"
                  top="calc(100% + 14px)"
                  minW="310px"
                  borderRadius="20px"
                  overflow="hidden"
                >
                  <Flex align="center" columnGap={3} p={4} bg="rgba(100,64,251,0.05)">
                    <Avatar
                      name={`${user.user.firstName} ${user.user.lastName}`}
                      size="md"
                      src={getUser?.profilePicture}
                    />
                    <Box>
                      <Text color="#140342" fontWeight="bold">
                        {user.user.firstName} {user.user.lastName}
                      </Text>
                      <Text color="gray.500" fontSize="sm">
                        {user.user.email}
                      </Text>
                    </Box>
                  </Flex>
                  <Divider />
                  <Stack p={4} spacing={3} color="#4f547b" fontSize="sm">
                    <Text as={Link} to="home/my-courses/learning/">
                      My Learning
                    </Text>
                    <Text as={Link} to="/cart">
                      My Cart
                    </Text>
                    {hasStudentRole && hasInstructorRole && (
                      <Text as={Link} to="/instructor/courses">
                        Instructor Dashboard
                      </Text>
                    )}
                    {hasStudentRole && !hasInstructorRole && (
                      <Text as={Link} to="/become-instructor">
                        Teach on DevUpshot
                      </Text>
                    )}
                    <Divider />
                    <Text cursor="pointer" color="#140342" fontWeight={600} onClick={() => handleLogout()}>
                      Logout
                    </Text>
                  </Stack>
                </Box>
              )}
            </Box>
          ) : (
            <Flex align="center" columnGap={3} display={{ base: "none", md: "flex" }}>
              <Button color="#6440fb" variant="ghost" as={Link} to="/sign-in">
                Log In
              </Button>
              <Button
                px={7}
                py={6}
                bgGradient="linear(to-r, #6440fb, #8b5cf6)"
                color="white"
                boxShadow="0 14px 30px rgba(100,64,251,0.28)"
                _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
                as={Link}
                to="/sign-up"
              >
                Sign Up
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={{ base: "full", sm: "md" }}>
        <DrawerOverlay />
        <DrawerContent bg="linear-gradient(180deg, #fbfaff 0%, #ffffff 100%)">
          <DrawerCloseButton top={5} right={5} borderRadius="full" />
          <DrawerHeader borderBottomWidth="1px" borderColor="blackAlpha.100" py={6}>
            {user ? (
              <Flex align="center" columnGap={3} pr="10">
                <Avatar
                  name={`${user.user.firstName} ${user.user.lastName}`}
                  size="md"
                  src={getUser?.profilePicture}
                />
                <Box>
                  <Text color="#140342" fontWeight="bold">
                    {user.user.firstName} {user.user.lastName}
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    {user.user.email}
                  </Text>
                </Box>
              </Flex>
            ) : (
              <Flex columnGap={4}>
                <Text as={Link} to="/sign-in" onClick={onClose}>
                  Login
                </Text>
                <Text as={Link} to="/sign-up" color="#6440fb" fontWeight={600} onClick={onClose}>
                  Sign Up
                </Text>
              </Flex>
            )}
          </DrawerHeader>
          <DrawerBody py={8}>
            <Stack spacing={6}>
              <Stack spacing={2}>
                {links.map(({ id, name, href }) => (
                  <NavLink key={id} to={href} onClick={onClose}>
                    {({ isActive }) => (
                      <Box
                        px={4}
                        py={3}
                        borderRadius="16px"
                        bg={isActive ? "rgba(100,64,251,0.08)" : "transparent"}
                        color={isActive ? "#6440fb" : "#140342"}
                        fontWeight={600}
                      >
                        {name}
                      </Box>
                    )}
                  </NavLink>
                ))}
              </Stack>

              {user && hasStudentRole && hasInstructorRole && (
                <Text as={Link} to="/instructor/courses" color="#6440fb" fontWeight={600} onClick={onClose}>
                  Switch to instructor view
                </Text>
              )}

              {user && !hasInstructorRole && (
                <Text as={Link} to="/become-instructor" color="#140342" fontWeight={600} onClick={onClose}>
                  Teach on DevUpshot
                </Text>
              )}

              <Divider />

              <Stack spacing={2} color="#4f547b">
                <Text fontWeight={700} color="#140342">
                  Contact
                </Text>
                <Text>09167647648</Text>
                <Text>Yaba, Lagos</Text>
                <Text>devupshot@gmail.com</Text>
              </Stack>

              <Flex columnGap={7} color="#6440fb">
                <Box as="a" href="https://www.facebook.com/362944173561967" target="_blank">
                  <FaFacebookF />
                </Box>
                <Box as="a" href="https://twitter.com/devupshot1" target="_blank">
                  <FaTwitter />
                </Box>
                <Box
                  as="a"
                  href="https://www.instagram.com/devupshot?igsh=MWR4Z3hxaGhmbmplMw=="
                  target="_blank"
                >
                  <FaInstagram />
                </Box>
                <Box as="a" href="https://www.linkedin.com/company/devupshot/" target="_blank">
                  <FaLinkedinIn />
                </Box>
              </Flex>

              {user && (
                <Button
                  alignSelf="start"
                  bg="#140342"
                  color="white"
                  _hover={{ bg: "#24115f" }}
                  onClick={() => handleLogout(true)}
                >
                  Logout
                </Button>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default Navbar;
