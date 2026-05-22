import {
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { MdMenu, MdPayment } from "react-icons/md";
import { useRef } from "react";
import { NavItem } from "./NavItem";
import { useGetUser } from "../hooks";
import { FaYoutube } from "react-icons/fa";

const links = [
  { name: "courses", href: "courses", icon: FaYoutube },
  { name: "Payment", href: "payment", icon: MdPayment },
];

const InstructorNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useGetUser();
  const btnRef: any = useRef();
  const { user } = useSelector((store: RootState) => store.user);

  return (
    <>
      <Flex
        align="center"
        justify={{ base: "space-between", md: "flex-end" }}
        w="100%"
        px={{ base: 4, md: 6 }}
        py={4}
      >
        <Box
          cursor="pointer"
          as="button"
          display={{ base: "flex", md: "none" }}
          ref={btnRef}
          onClick={onOpen}
          w="48px"
          h="48px"
          borderRadius="16px"
          bg="white"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 10px 24px rgba(20,3,66,0.08)"
        >
          <MdMenu fontSize={24} />
        </Box>

        <Flex
          align="center"
          columnGap={4}
          px={4}
          py={3}
          borderRadius="20px"
          bg="rgba(255,255,255,0.82)"
          border="1px solid rgba(20,3,66,0.08)"
          boxShadow="0 16px 32px rgba(20,3,66,0.08)"
          backdropFilter="blur(14px)"
        >
          <Stack spacing={0} align="end" display={{ base: "none", sm: "flex" }}>
            <Badge colorScheme="purple" borderRadius="full" px={2.5} py={1}>
              Instructor
            </Badge>
            <Text as={Link} to="/" fontWeight={600} fontSize="sm" color="#140342">
              Switch to student view
            </Text>
          </Stack>
          <Avatar
            name={`${user?.user?.firstName} ${user?.user?.lastName}`}
            size="sm"
            fontWeight="bold"
            bg="white"
            color="#140342"
            src={data?.profilePicture}
            border="2px solid rgba(100,64,251,0.12)"
          />
        </Flex>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="linear-gradient(180deg, #fbfaff 0%, #ffffff 100%)">
            <DrawerCloseButton />
            <DrawerHeader py={6}>
              <Flex columnGap={4} mt={4}>
                <Avatar
                  name={`${data?.firstName} ${data?.lastName}`}
                  size="md"
                  src={data?.profilePicture}
                />
                <Box>
                  <Text fontWeight="bold" fontSize="18px">
                    Hi, {data?.firstName} {data?.lastName}
                  </Text>
                  <Text fontSize="14px" color="gray.500">
                    Welcome back
                  </Text>
                </Box>
              </Flex>
            </DrawerHeader>
            <Divider />
            <DrawerBody>
              <Box p={5}>
                {links.map((link, i) => (
                  <Box key={i} onClick={onClose}>
                    <NavItem to={link.href} icon={link.icon}>
                      {link.name}
                    </NavItem>
                  </Box>
                ))}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};

export default InstructorNavbar;
