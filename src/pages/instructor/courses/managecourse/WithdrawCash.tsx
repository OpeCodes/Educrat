import { Divider, Stack, Text } from "@chakra-ui/react";
import { BankSearch } from "../../../../components";

const WithdrawCash = () => {
  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Withdraw E-Cash
      </Text>
      <Divider />
      <BankSearch />
    </Stack>
  );
};

export default WithdrawCash;
