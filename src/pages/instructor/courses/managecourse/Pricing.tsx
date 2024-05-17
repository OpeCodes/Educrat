import { Button, Divider, Flex, Select, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { pricingPageValidationSchema } from "../../../../schemas";
import { useGetSingleCourse, useSingleCourse } from "../../../../hooks/course";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


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
];
const Pricing = () => {
 
  const { id } = useParams();
  useEffect(() => {
    refetch();
  }, [id]);

  const {
    getSingleCourse,
    refetch,
  } = useGetSingleCourse(id);
  const { singleCourse, isPending: isLoading } = useSingleCourse();

  const handleSubmit = (values: any) => {
    const price = parseFloat(values.price);
    singleCourse({
      singleId: getSingleCourse?.id,
      user: {price},
    });
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={pricingPageValidationSchema}>
          {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
            <Flex
              rowGap={"5px"}
              flexDirection="column"
              maxHeight={{ base: "100%", lg: "530px" }}
              overflowY={"auto"}
              pb={5}
            >
              <Flex columnGap={6}>
              <Select
                name="currency"
                onChange={handleChange}
                mt={6}
                variant="filled"
                value={values.currency} 
              >
                {currencies.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.value}
                  </option>
                ))}
              </Select>
              <Select
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
              </Flex>

              <Button
                color="#ffffff"
                fontWeight={"500"}
                fontSize={14}
                as={"button"}
                mt={3}
                variant="outline"
                spinnerPlacement="end"
                isLoading={isLoading}
                onClick={() => handleSubmit()}
                type="button"
                backgroundColor={"black"}
                width={"fit-content"}
              >
                Save
              </Button>
            </Flex>
          )}
        </Formik>
      </Flex>
    </Stack>
  );
};

export default Pricing;
