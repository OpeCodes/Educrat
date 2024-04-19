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

const AddToCartButton = () => {
  const array = [1, 2];
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
              1
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
              {array.map(() => {
                return (
                  <Stack px={1} py={3}>
                    <Flex justify={"space-between"} columnGap={2}>
                      <Flex columnGap={2}>
                        <Image
                          boxSize="70px"
                          objectFit="cover"
                          src={"https://bit.ly/dan-abramov"}
                        />
                        <Stack>
                          <Text width={"90%"} fontSize={16}>
                            NodeJS Tutorial and Projects Course
                          </Text>
                          <Text>$50</Text>
                        </Stack>
                      </Flex>
                      <Text
                        cursor={"pointer"}
                        color={"blue"}
                        fontWeight={"bold"}
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
              <Flex justify={"space-between"} my={2}>
                <Text>Total:</Text>
                <Text>$168</Text>
              </Flex>
              <Flex justify={"center"} columnGap={10}>
                <Button
                  bg={"#6440FB"}
                  py={"25px"}
                  variant="solid"
                  color={"white"}
                >
                  Go to Course
                </Button>
                <Button
                  bg={"#6440FB"}
                  py={"25px"}
                  variant="solid"
                  color={"white"}
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
