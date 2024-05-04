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
    useToast,
  } from "@chakra-ui/react";
  import { useSelector } from "react-redux";
  import { RootState } from "../store/store";
  import { useState } from "react";
  import paystack from "../assets/paystack.png";
  import { useCheckoutOrder } from "../hooks/auth/price";
  
  const SingleCheckoutPage = () => {
    const { courses,singleCartCourse } = useSelector((store: RootState) => store?.cart);
  console.log(singleCartCourse,"singleCartCourse")
    const { order } = useSelector((store: RootState) => store?.user);   
    const toast = useToast();
    const [value, setValue] = useState("false");
    const { checkoutOrder } = useCheckoutOrder();
  
    const handleCheckout = () => {
      if (value === "false") {
        toast({
          title: "Please select a payment method",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      } else {
        checkoutOrder({ id: order?.id });
      }
    };
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
                <Stack
                  borderWidth={1}
                  p={2}
                  bg={"#F7F9FA"}
                  cursor={"pointer"}
                  py={3}
                >
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
                <Text fontSize={"1.5rem"} fontWeight={"700"} mt={"1.0rem"}>
                  Order details
                </Text>
                
                    <Flex
                    key={singleCartCourse.id}
                      mt={"rem"}
                      columnGap={10}
                      justify={"space-between"}
                      align={"center"}
                      my={1}
                    >
                      <Flex columnGap={2} align={"center"}>
                        <Image
                          boxSize="40px"
                          objectFit="cover"
                          src={singleCartCourse.img}
                          alt="Dan Abramov"
                        />
                        <Text fontWeight={"bold"}>
                          {singleCartCourse.title}
                        </Text>
                      </Flex>
                      <Text>{singleCartCourse.price}</Text>
                    </Flex>               
           
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
                    <Text>N{singleCartCourse.price}</Text>
                  </Flex>
                  <Flex justify={"space-between"}>
                    <Text>Discounts:</Text>
                    <Text>N0</Text>
                  </Flex>
  
                  <Divider />
                  <Flex justify={"space-between"} fontWeight={"bold"}>
                    <Text>Total</Text>
                    <Text>N{singleCartCourse.price}</Text>
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
                  onClick={handleCheckout}
                  isDisabled={singleCartCourse.price === 0}
                >
                  {value === "true" ? "Proceed" : "Complete Checkout"}
                </Button>
              </Stack>
            </Box>
          </GridItem>
        </Grid>
      </Stack>
    );
  };
  
  export default SingleCheckoutPage;
  


