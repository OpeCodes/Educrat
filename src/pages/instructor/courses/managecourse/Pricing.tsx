import { Button, Divider, Flex, Select, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";

const initialValues = {
  currency: "USD",
  price: "",
};
const Pricing = () => {
  const handleSubmit = () => {};
  return (
    <Stack p={5}>
      <Text fontSize={20} fontWeight={"bold"}>
        Pricing
      </Text>
      <Divider />
      <Stack py={5}>
        <Text fontWeight={"bold"}>Set a price for your course</Text>
        <Text fontSize={14}>
          Please select the currency and the price tier for your course. If
          you’d like to offer your course for free, it must have a total video
          length of less than 2 hours. Also, courses with practice tests can not
          be free.
        </Text>
      </Stack>

      <Flex>
        <Formik
          initialValues={initialValues}
          //   validationSchema={courseLandingSchema}
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
                  <Text style={{ color: "red", marginTop: 0 }} fontSize="14px">
                    <>{errors.currency}</>
                  </Text>
                )}
              </Stack>
              <Stack>
                <Text fontWeight={"bold"}>Price Tier</Text>
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
                  <Text style={{ color: "red", marginTop: 0 }} fontSize="14px">
                    <>{errors.currency}</>
                  </Text>
                )}
              </Stack>
              </Flex>
              <Button
                color="#ffffff"
                fontWeight={"500"}
                fontSize={14}
                as={"button"}
                py={2}
                px={4}
                variant="outline"
                spinnerPlacement="end"
                onClick={() => handleSubmit()}
                type="button"
                backgroundColor={"black"}
                width={"fit-content"}
              >
                Save Section
              </Button>
            </Stack>
          )}
        </Formik>
      </Flex>
    </Stack>
  );
};

export default Pricing;
