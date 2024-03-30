import { Divider, Stack, Text } from "@chakra-ui/react";

const Pricing = () => {
  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Pricing
      </Text>
      <Divider />
      <Stack p={5}>
      <Text fontWeight={"bold"}>Set a price for your course</Text>
      <Text fontSize={14}>
        Please select the currency and the price tier for your course. If you’d
        like to offer your course for free, it must have a total video length of
        less than 2 hours. Also, courses with practice tests can not be free.
      </Text>
      </Stack>
    </Stack>
  );
};

export default Pricing;
