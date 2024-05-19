import {
  Flex,
  Image,
  Stack,
  Box,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerCloseButton,
  Divider,
  Avatar,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-2.svg";
import { BiMenuAltRight } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { logoutUser } from "../features/user/UserSlice";
import { useDispatch } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { useGetUser } from "../hooks";
import { useQueryClient } from "@tanstack/react-query";
const links = [
  {
    id: 1,
    name: "Home",
    href: ".",
  },
  {
    id: 2,
    name: "Course",
    href: "/all-courses",
  },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hover, setHover] = useBoolean();
  const navigate = useNavigate();
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
  const queryClient = useQueryClient();

  return (
    <Stack>
      <Flex
        bg="white"
        shadow={"base"}
        zIndex={10}
        py={4}
        px={{ base: "6", md: "12", lg: "16" }}
        width={"100%"}
        position={"fixed"}
        justify={"space-between"}
        align={"center"}
      >
        <Flex justify={"space-between"} align={"center"}>
          <Box width={"160px"} as={Link} to={"/"}>
            <Image src={logo} alt="logo" />
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
              transition={"all"}
              key={id}
            >
              <NavLink
                to={href}
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#6440fb" : "#140342",
                  };
                }}
              >
                {name}
              </NavLink>
            </Box>
          ))}
        </Flex>

        <Flex align={"center"} columnGap={5} color="white">
          {user && (
            <Box display={{ base: "none", md: "flex" }}>
              {hasStudentRole && !hasInstructorRole && (
                <Text
                  fontSize="15px"
                  cursor={"pointer"}
                  as={Link}
                  to="/become-instructor"
                >
                  Teach on Educrat
                </Text>
              )}
              {!hasStudentRole && hasInstructorRole && (
                <p>This is content for instructors.</p>
              )}
              {hasStudentRole && hasInstructorRole && (
                <Text
                  fontSize="15px"
                  cursor={"pointer"}
                  as={Link}
                  to="/instructor/courses"
                >
                  Instructor
                </Text>
              )}
            </Box>
          )}

          {/* <Text cursor={"pointer"} onClick={() => onModalOpen()}>
            <FiSearch color={"#6440fb"} fontSize={"25px"} />
          </Text> */}
          {hasStudentRole && !hasInstructorRole && (
            <Text
              fontSize="15px"
              cursor={"pointer"}
              color={"black"}
              display={{ base: "none", md: "flex" }}
              onClick={() => {
                navigate("/become-instructor");
              }}
            >
              Teach on Educrat
            </Text>
          )}
          {!user && (
            <Text
              fontSize="15px"
              cursor={"pointer"}
              color={"black"}
              display={{ base: "none", md: "flex" }}
              onClick={() => {
                navigate("/sign-in");
                toast({
                  title: "Sign in to become an instructor",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              Teach on Educrat
            </Text>
          )}
          {user && hasStudentRole && hasInstructorRole && (
            <Text
              fontSize="15px"
              cursor={"pointer"}
              as={Link}
              to="/instructor/courses"
              color={"black"}
              display={{ base: "none", md: "flex" }}
            >
              Instructor Dashboard
            </Text>
          )}

          <Stack>
            <AddToCartButton />
          </Stack>
          <Box
            fontSize={"50px"}
            color={"#6440fb"}
            cursor={"pointer"}
            display={{ base: "black", lg: "none" }}
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
              />
              {hover && (
                <Box
                  bg="white"
                  boxShadow="0 0.75rem 1rem rgb(189 197 209 / 30%)"
                  position="absolute"
                  right="1"
                  top="20"
                  mt={-3}
                >
                  <Flex align={"center"} columnGap={3} p={3} mb={2}>
                    <Avatar
                      name={`${user.user.firstName} ${user.user.lastName}`}
                      size="md"
                      fontWeight="bold"
                      bg="white"
                      color="#140342"
                      src={getUser?.profilePicture}
                      cursor="pointer"
                    />
                    <Box>
                      <Text color="black" fontWeight={"bold"}>
                        {user.user.firstName} {user.user.lastName}
                      </Text>
                      <Text color={"gray"}>{user.user.email}</Text>
                    </Box>
                  </Flex>
                  <Divider />
                  <Box color="gray" fontSize={"15px"}>
                    <Stack p={3}>
                      <Text as={Link} to={"home/my-courses/learning/"}>
                        My Learning
                      </Text>
                      <Text as={Link} to={"/cart"}>
                        My Cart
                      </Text>
                      {hasStudentRole && hasInstructorRole && (
                        <Text
                          fontSize="15px"
                          cursor={"pointer"}
                          as={Link}
                          to="/instructor/courses"
                        >
                          Instructor Dashboard
                        </Text>
                      )}
                      {hasStudentRole && !hasInstructorRole && (
                        <Text
                          fontSize="15px"
                          cursor={"pointer"}
                          as={Link}
                          to="/become-instructor"
                        >
                          Teach on Educrat
                        </Text>
                      )}
                    </Stack>
                    <Divider />
                    <Stack p={3}>
                      <Text>Notifications</Text>
                      <Text>Messages</Text>
                    </Stack>
                    <Divider />
                    <Stack p={3}>
                      <Text>Account Settings</Text>
                      <Text>Payment Methods</Text>
                      <Text>Purcase History</Text>
                    </Stack>
                    <Divider />
                    <Stack p={3}>
                      <Text>Public Profile</Text>
                      <Text>Edit Profile</Text>
                    </Stack>
                    <Divider />
                    <Stack p={3} pb={3}>
                      <Text>Help</Text>
                      <Text
                        cursor={"pointer"}
                        onClick={() => {

                          toast({
                            title: `Logging out...`,
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                          });

                          setTimeout(() => {
                            dispatch(logoutUser());
                          }, 2000);

                        }}
                      >
                        Logout
                      </Text>
                    </Stack>
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <>
              <Button
                color={"#6440fb"}
                variant="link"
                display={{ base: "none", md: "flex" }}
                as={Link}
                to={"/sign-in"}
              >
                Log In
              </Button>
              <Button
                display={{ base: "none", md: "flex" }}
                px={10}
                py={7}
                bg="#6440fb"
                color="white"
                variant="solid"
                borderColor={"white"}
                borderWidth={2}
                borderRadius={"full"}
                _hover={{
                  background: "white",
                  color: "#6440fb",
                  borderColor: "#6440fb",
                }}
                as={Link}
                to={"/sign-up"}
              >
                Sign Up
              </Button>
            </>
          )}
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
        <DrawerContent h={"100vh"}>
          <DrawerHeader
            borderBottomWidth="1px"
            display={"flex"}
            columnGap={"10px"}
            fontSize={"15px"}
            p={2}
          >
            {user ? (
              <>
                <Flex align={"center"} columnGap={3} mb={2} pr="10">
                  <Avatar
                    name={`${user.user.firstName} ${user.user.lastName}`}
                    size="md"
                    fontWeight="bold"
                    bg="white"
                    color="#140342"
                    src={getUser?.profilePicture}
                    cursor="pointer"
                  />
                  <Box p={0}>
                    <Text color="black" fontWeight={"bold"}>
                      {user.user.firstName} {user.user.lastName}
                    </Text>
                    <Text color={"gray"} fontSize={"14px"}>
                      {user.user.email}
                    </Text>
                  </Box>
                </Flex>
              </>
            ) : (
              <>
                <Text
                  as={Link}
                  to="/sign-in"
                  _hover={{ textDecoration: "none" }}
                >
                  Login
                </Text>
                <Text as={Link} to="/sign-up">
                  Sign Up
                </Text>
              </>
            )}

            <Box display={{ base: "block", md: "none" }}>
              <DrawerCloseButton bg="white" borderRadius={"100%"} />
            </Box>
          </DrawerHeader>
          <Box paddingLeft={"32px"}>
            {user && (
              <>
                {hasStudentRole && hasInstructorRole && (
                  <Text
                    fontSize="15px"
                    cursor={"pointer"}
                    as={Link}
                    to="/instructor/courses"
                    color="blue"
                  >
                    Switch to instructor view
                  </Text>
                )}
              </>
            )}
            <br />
            {user && (
              <>
                {hasStudentRole && hasInstructorRole && (
                  <Text
                    _hover={{ textDecoration: "none" }}
                    onClick={() => {
                      toast({
                        title: `Logging out...`,
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                      });
                        //  window.location.reload()
                      setTimeout(() => {
                        dispatch(logoutUser());
                        onClose();
                      }, 2000);
                    }}
                    cursor={"pointer"}
                  >
                    Logout out
                  </Text>
                )}
              </>
            )}
          </Box>
          <DrawerBody>
            <Box>
              {links.map(({ id, name, href }) => (
                <Box
                  paddingX={"10px"}
                  borderRadius={5}
                  paddingY={"2px"}
                  transition={"all"}
                  my={1}
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
                    onClick={onClose}
                  >
                    {name}
                  </NavLink>
                </Box>
              ))}
            </Box>
            <Divider orientation="horizontal" my={5} />
            <Flex rowGap={"8px"} flexDirection={"column"}>
              <Text>Call Us</Text>
              <Text>08145885175</Text>
              <Text>Abule oja</Text>
              <Text>Yaba lagos</Text>
              <Text>adedokunpeter11@gmail.com</Text>
            </Flex>
            <Flex my="15px" columnGap={7} cursor={"pointer"}>
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* <Modal onClose={onModalClose} size={"full"} isOpen={modalOpen}>
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
        </ModalContent>
      </Modal> */}
    </Stack>
  );
};

export default Navbar;
