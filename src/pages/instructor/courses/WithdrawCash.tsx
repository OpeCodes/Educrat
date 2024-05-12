import { Divider, Stack, Text } from "@chakra-ui/react";
import { BankSearch } from "../../../components";
import { IoMdArrowRoundBack } from "react-icons/io";

const WithdrawCash = ({ setStep }: any) => {
  return (
    <Stack>
      <Text cursor={"pointer"} onClick={() => setStep(0)}>
        <IoMdArrowRoundBack size={30} />
      </Text>
      <Text p={5} fontSize={40} fontWeight={"bold"}>
        Withdraw E-Cash
      </Text>
      <Divider />
      <Stack p={5}>
        <BankSearch />
      </Stack>
    </Stack>
  );
};

export default WithdrawCash;
