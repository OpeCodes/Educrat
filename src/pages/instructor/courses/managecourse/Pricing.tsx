import { Button, Divider, Flex, Select, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { pricingPageValidationSchema } from "../../../../schemas";

const initialValues = {
  currency: "NGN",
  price: "free",
};

interface Price {
  id: number;
  value: string | number;
  price: string;
}

const pricesValues: Price[] = [
  {
    id: 0,
    value: "free",
    price: "free",
  },
  {
    id: 1,
    value: 100,
    price: "N100 (tier 1)",
  },
  {
    id: 2,
    value: 200,
    price: "N200 (tier 2)",
  },
  {
    id: 3,
    value: 300,
    price: "300 (tier 3)",
  },
  {
    id: 4,
    value: 400,
    price: "N400 (tier 4)",
  },
  {
    id: 5,
    value: 500,
    price: "N600 (tier 5)",
  },
  {
    id: 6,
    value: 600,
    price: "N600 (tier 6)",
  },
  {
    id: 7,
    value: 700,
    price: "N700 (tier 7)",
  },
  {
    id: 8,
    value: 800,
    price: "N800 (tier 8)",
  },
  {
    id: 9,
    value: 900,
    price: "N900 (tier 9)",
  },
  {
    id: 10,
    value: 1000,
    price: "N1000 (tier 10)",
  },
  {
    id: 11,
    value: 1100,
    price: "N1100 (tier 11)",
  },
];
const Pricing = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
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
        <Formik
          initialValues={initialValues}
          validationSchema={pricingPageValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <Stack>
              <Flex columnGap={5}>
                <Stack>
                  <Text fontWeight={"bold"}>Currency</Text>
                  <Select
                    variant={"filled"}
                    //   width={{ base: "100%", md: "35%" }}
                    name="currency"
                    value={values.currency}
                    onChange={handleChange}
                  >
                    <option value="NGN">NGN</option>
                  </Select>
                  {errors.currency && (
                    <Text
                      style={{ color: "red", marginTop: 0 }}
                      fontSize="14px"
                    >
                      <>{errors.currency}</>
                    </Text>
                  )}
                </Stack>
                <Stack>
                  <Text fontWeight={"bold"}>Price Tier</Text>
                  <Select
                    variant={"filled"}
                    //   width={{ base: "100%", md: "35%" }}
                    name="price"
                    placeholder="Select"
                    value={values.price}
                    onChange={handleChange}
                  >
                    {pricesValues.map(({ id, price, value }: Price) => {
                      return (
                        <option key={id} value={value}>
                          {price}
                        </option>
                      );
                    })}
                  </Select>
                  {errors.price && (
                    <Text
                      style={{ color: "red", marginTop: -8 }}
                      fontSize="14px"
                    >
                      <>{errors.price}</>
                    </Text>
                  )}
                </Stack>
              </Flex>
              <Button
                color="#ffffff"
                fontWeight={"500"}
                fontSize={14}
                as={"button"}
                mt={3}
                py={6}
                px={6}
                variant="outline"
                spinnerPlacement="end"
                onClick={() => handleSubmit()}
                type="button"
                backgroundColor={"black"}
                width={"fit-content"}
              >
                Save
              </Button>
            </Stack>
          )}
        </Formik>
      </Flex>
    </Stack>
  );
};

export default Pricing;
