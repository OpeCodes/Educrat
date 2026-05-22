import { Button, Flex, Select, Stack, Text } from "@chakra-ui/react";
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
  { id: 1, price: 0, name: "Free" },
  { id: 2, price: 100, name: "N100 (tier 1)" },
  { id: 3, price: 200, name: "N200 (tier 2)" },
  { id: 4, price: 300, name: "N300 (tier 3)" },
  { id: 5, price: 400, name: "N400 (tier 4)" },
  { id: 6, price: 500, name: "N500 (tier 5)" },
];

const currencies = [{ value: "NGN" }];

const Pricing = () => {
  const { id } = useParams();

  const { getSingleCourse, refetch } = useGetSingleCourse(id);
  const { singleCourse, isPending: isLoading } = useSingleCourse();

  useEffect(() => {
    refetch();
  }, [id]);

  const handleSubmit = (values: any) => {
    const price = parseFloat(values.price);
    singleCourse({
      singleId: getSingleCourse?.id,
      user: { price },
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
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Text fontSize="2xl" fontWeight={700} color="#140342">
          Pricing
        </Text>
        <Text color="#4f547b" maxW="760px">
          Set a clear price tier for your course. You can start free or choose a simple NGN pricing level.
        </Text>
      </Stack>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={pricingPageValidationSchema}
      >
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <Flex rowGap={5} flexDirection="column" pb={5}>
            <Flex columnGap={6} rowGap={5} flexDirection={{ base: "column", md: "row" }}>
              <Stack flex={1}>
                <Text fontWeight={700} color="#140342">
                  Currency
                </Text>
                <Select
                  name="currency"
                  onChange={handleChange}
                  variant="filled"
                  value={values.currency}
                >
                  {currencies.map((currency) => (
                    <option key={currency.value} value={currency.value}>
                      {currency.value}
                    </option>
                  ))}
                </Select>
              </Stack>
              <Stack flex={1}>
                <Text fontWeight={700} color="#140342">
                  Price tier
                </Text>
                <Select
                  name="price"
                  onChange={(e) => handleChangePrice(e, setFieldValue)}
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
                  <Text color="red.500" mt={1} fontSize="14px">
                    {errors.price}
                  </Text>
                )}
              </Stack>
            </Flex>

            <Button
              color="white"
              fontWeight={600}
              fontSize={14}
              mt={3}
              isLoading={isLoading}
              onClick={() => handleSubmit()}
              bgGradient="linear(to-r, #6440fb, #8b5cf6)"
              width="fit-content"
              py={6}
              px={8}
              boxShadow="0 16px 32px rgba(100,64,251,0.24)"
              _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
            >
              Save pricing
            </Button>
          </Flex>
        )}
      </Formik>
    </Stack>
  );
};

export default Pricing;
