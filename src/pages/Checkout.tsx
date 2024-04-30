import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import paystack from "../assets/paystack.png";

const Checkout = () => {
  const { courses } = useSelector((store: RootState) => store?.cart);

  const [value, setValue] = useState("false");

  return (
    <Stack mt={"5rem"}>
      <Grid templateColumns={{ lg: "repeat(2, 1fr)" }} columnGap={5}>
        <GridItem
          height="100vh"
          justifyContent={"center"}
          alignContent={"center"}
          display={"flex"}
          mt={"2rem"}
        >
          <Stack maxW={"70%"} w={"full"}>
            <Text fontSize={"2rem"} fontWeight={"500"}>
              Checkout
            </Text>
            <Text fontSize={"1.5rem"} fontWeight={"500"}>
              Billing address
            </Text>
            <Stack my={"0.5rem"}>
              <Flex justify={"space-between"} align={"center"}>
                <Text fontWeight={"bold"}>Country</Text>
                <Text color={"gray"} fontSize={12}>
                  Required
                </Text>
              </Flex>
              <Select>
                <option>Nigeria</option>
              </Select>
            </Stack>
            <Stack>
              <Flex align={"center"} justify={"space-between"}>
                <Text fontSize={"1.5rem"} fontWeight={"500"}>
                  Payment Method
                </Text>

                <Stack>
                  <Text color={"gray"} fontSize={12}>
                    Secured connection
                  </Text>
                </Stack>
              </Flex>
              <Stack borderWidth={1} p={2} bg={"#F7F9FA"} cursor={"pointer"}>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="row">
                    <Radio value={"true"}>
                      <Image src={paystack} width={"110px"} />
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
            </Stack>
            <Stack>
              <Text fontSize={"1.5rem"} fontWeight={"700"}>
                Order details
              </Text>
              {courses?.map((course: any) => {
                return (
                  <Flex
                    mt={"rem"}
                    columnGap={10}
                    justify={"space-between"}
                    align={"center"}
                  >
                    <Flex columnGap={2} align={"center"}>
                      <Image
                        boxSize="40px"
                        objectFit="cover"
                        src={course.img}
                        alt="Dan Abramov"
                      />
                      <Text fontWeight={"bold"}>
                        HTML&CSS Tutorial and Projects Course (Flexbox&Grid)
                        {course.title}
                      </Text>
                    </Flex>
                    <Text>100</Text>
                  </Flex>
                );
              })}
            </Stack>
          </Stack>
        </GridItem>
        <GridItem w="100%">
          <Box
            boxSize="sm"
            w="50%"
            h="100vh"
            bg={"#f7f9fa"}
            mx={"auto"}
            display={{ base: "none", lg: "block" }}
            position={"fixed"}
          >
            <Stack mt={"6rem"} mx={"10rem"}>
              <Text fontSize={"1.6rem"} fontWeight={"bold"}>
                Summary
              </Text>
              <Stack>
                <Flex justify={"space-between"}>
                  <Text>Original Price</Text>
                  <Text>N1000</Text>
                </Flex>
                <Flex justify={"space-between"}>
                  <Text>Discounts:</Text>
                  <Text>N0</Text>
                </Flex>

                <Divider />
                <Flex justify={"space-between"} fontWeight={"bold"}>
                  <Text>Total</Text>
                  <Text>N1000</Text>
                </Flex>
              </Stack>
              <Text mt={"0.6rem"} fontSize={13} color={"gray"}>
                By completing your purchase you agree to these Terms of Service.
              </Text>
              <Button
                mt={3}
                bg={"#A435F0"}
                py={7}
                color={"white"}
                borderRadius={0}
                variant="solid"
              >
                Complete Checkout
              </Button>
            </Stack>
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default Checkout;
