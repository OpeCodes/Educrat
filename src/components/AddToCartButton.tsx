import {
  Badge,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  Stack,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";
import { IoCartOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { removeCourseFromCart } from "../features/cart/CartSlice";
import { useDispatch } from "react-redux";

const AddToCartButton = () => {
  const { courses } = useSelector((store: RootState) => store?.cart);
  const dispatch = useDispatch();
  const totalPrice = courses.reduce(
    (acc: any, course: any) => acc + course.price,
    0
  );
  const handleRemoveFromCart = (courseId: string) => {
    dispatch(removeCourseFromCart(courseId));
  };
  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Box position="relative" as={"button"}>
            <Text cursor="pointer">
              <IoCartOutline color="#6440fb" fontSize="25px" />
            </Text>
            <Badge
              position="absolute"
              top="-3"
              right="-2"
              borderRadius="50%"
              bg="red"
              color="white"
              padding={2}
              fontSize="xs"
              lineHeight="none"
              width="1.0rem"
              height="1.0rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {courses.length}
            </Badge>
          </Box>
        </PopoverTrigger>
        <PopoverContent
          color="black"
          borderWidth={0}
          shadow={"base"}
          zIndex={90000000}
          width={"400px"}
        >
          <PopoverBody>
            <Stack maxH={"250px"} h={"100%"} overflow={"auto"} borderWidth={0}>
              {courses.map((course: any, index) => {
                return (
                  <Stack mx={3} py={3} key={index}>
                    <Flex justify={"space-between"} columnGap={2}>
                      <Flex columnGap={2}>
                        <Image
                          boxSize="70px"
                          objectFit="cover"
                          src={course.img}
                        />
                        <Stack>
                          <Text width={"90%"} fontSize={16}>
                            {course.title}
                          </Text>
                          <Text>N{course.price}</Text>
                        </Stack>
                      </Flex>
                      <Text
                        cursor={"pointer"}
                        color={"blue"}
                        fontWeight={"bold"}
                        onClick={() => handleRemoveFromCart(course.id)}
                      >
                        <MdClose fontSize={20} />
                      </Text>
                    </Flex>
                  </Stack>
                );
              })}
            </Stack>
          </PopoverBody>
          <PopoverFooter>
            <Stack mx={3}>
              <Flex justify={"space-between"} my={2} fontSize={20}>
                <Text>Total:</Text>
                <Text>N{totalPrice}</Text>
              </Flex>
              <Flex justify={"center"} columnGap={10} pb={5}>
                <Button
                  bg={"#6440FB"}
                  py={"25px"}
                  variant="solid"
                  fontWeight={400}
                  color={"white"}
                  width={"100%"}
                  as={Link}
                  to={"/cart"}
                >
                  View Cart{" "}
                </Button>
                <Button
                  bg={"#6440FB"}
                  py={"25px"}
                  variant="solid"
                  color={"white"}
                  fontWeight={400}
                  width={"100%"}
                >
                  Checkout
                </Button>
              </Flex>
            </Stack>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddToCartButton;
