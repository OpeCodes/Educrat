import { Button, Divider, Flex, Select, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";

interface Price {
  id: number;
  price: number;
  name: string;
}
const Pricing = () => {
  const initialValues = {
    currency: "NGN",
    price: 0,
  };

  const data = [
    {
      id: 1,
      price: 0,
      name: "free",
    },
    {
      id: 2,
      price: 100,
      name: "N100 (tier 1)",
    },
    {
      id: 3,
      price: 200,
      name: "N200 (tier 2)",
    },
    ,
    {
      id: 4,
      price: 300,
      name: "N300 (tier 3)",
    },
    {
      id: 5,
      price: 400,
      name: "N400 (tier 4)",
    },
    {
      id: 6,
      price: 500,
      name: "N500 (tier 5)",
    },
  ];
  const currencies = [
    { value: "NGN" },
    // { value: "USD",  },
    // { value: "EUR",},
  ];

  const handleSubmit = (values: any) => {
    const price = parseFloat(values.price);
    console.log({ ...values, price });
  };

  const handleChangePrice = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: any
  ) => {
    const price = parseFloat(e.target.value);
    setFieldValue("price", price);
  };

  return (
    <Stack p={5} mb={"12rem"}>
      <Text fontSize={20} fontWeight={"bold"}>
        Pricing
      </Text>
      <Divider />
      <Stack pt={5} pb={2}>
        <Text fontWeight={"bold"}>Set a price for your course</Text>
        <Text fontSize={14}>
          Please select the currency and the price tier for your course. You can
          use to offer like to offer your course for free.
        </Text>
      </Stack>

      <Flex>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
            <Flex
              rowGap={"5px"}
              flexDirection="column"
              maxHeight={{ base: "100%", lg: "530px" }}
              overflowY={"auto"}
              pb={5}
            >
              <Select
                placeholder="Select Currency"
                name="currency"
                onChange={handleChange}
                mt={6}
                variant="filled"
                value={values.currency} // Do not convert to string
              >
                {currencies.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.value}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Select Category"
                name="price"
                onChange={(e) => handleChangePrice(e, setFieldValue)}
                mt={6}
                variant="filled"
                value={values.price}
              >
                {data?.map((value: any) => (
                  <option key={value.id} id={value.id} value={value.price}>
                    {value.name}
                  </option>
                ))}
              </Select>
              {errors.price && (
                <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                  {errors.price}
                </Text>
              )}

              <Button
                bg={"#00FF84"}
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="end"
                width="100%"
                onClick={() => handleSubmit()}
                borderWidth={2}
                borderColor={"#00FF84"}
                _hover={{ background: "none", color: "#00FF84" }}
              >
                Create Course
              </Button>
            </Flex>
          )}
        </Formik>
      </Flex>
    </Stack>
  );
};

export default Pricing;
