import { Button, Divider, Flex, Select, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { pricingPageValidationSchema } from "../../../../schemas";

const initialValues = {
  currency: "USD",
  price: "",
};
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
          Please select the currency and the price tier for your course. be
          free.
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
                    <option value="USD">USD</option>
                    <option value="NGN">NGN</option>
                    <option value="GHS">GHS</option>
                    <option value="ZAR">ZAR</option>
                    <option value="KES">KES</option>
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
                    <option value="free">Free</option>
                    <option value="tier-1">$19.99 (tier 1)</option>
                    <option value="tier-2">$22.99 (tier 2)</option>
                    <option value="tier-3">$24.99 (tier 3)</option>
                    <option value="tier-4">#29.99 (tier-4)</option>
                  </Select>
                  {errors.price && (
                    <Text
                      style={{ color: "red", marginTop: 0 }}
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
