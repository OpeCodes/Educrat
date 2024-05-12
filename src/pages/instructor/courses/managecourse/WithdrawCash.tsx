import { Button, Divider, Stack, Text } from "@chakra-ui/react";
import { BankSearch } from "../../../../components";
import { IoMdArrowRoundBack } from "react-icons/io";

const WithdrawCash = ({setStep}: any) => {
  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Withdraw E-Cash
      </Text>

      <Divider />
      <Stack p={5}>
        <Button
          bg={"black"}
          color={"white"}
          width={"fit-content"}
          spinnerPlacement="end"
          mt={"-3"}
          mb={2}
          h={"30px"}
          w={"10px"}
          onClick={()=> setStep(0)}
        >
          <Text>
            <IoMdArrowRoundBack size={25} />
          </Text>
        </Button>
        <BankSearch />
      </Stack>
    </Stack>
  );
};

export default WithdrawCash;
