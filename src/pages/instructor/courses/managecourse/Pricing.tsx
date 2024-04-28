import {  Divider, Flex,  Stack, Text } from "@chakra-ui/react";

const Pricing = () => {
  // const { id } = useParams();
  // const {
  //   getSingleCourse,
  //   refetch,
  // } = useGetSingleCourse(id);
  // useEffect(() => {
  //   refetch();
  // }, [id]);


  // const { singleCourse, } = useSingleCourse();
 
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
    
      </Flex>
    </Stack>
  );
};

export default Pricing;
