import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import { BankSearch } from "../../../components";
import { IoMdArrowRoundBack } from "react-icons/io";

const WithdrawCash = ({ setStep }: any) => {
  return (
    <Stack spacing={6}>
      <Text
        cursor={"pointer"}
        onClick={() => setStep(0)}
        display="flex"
        alignItems="center"
        columnGap={2}
        color="#140342"
        fontWeight={700}
      >
        <IoMdArrowRoundBack size={24} />
        Back to wallet
      </Text>
      <Box className="surface-card" borderRadius="28px" p={{ base: 5, md: 7 }}>
        <Stack spacing={4}>
          <Text fontSize={{ base: "2rem", md: "2.6rem" }} fontWeight={"bold"} color="#140342">
            Withdraw E-Cash
          </Text>
          <Text color="#4f547b">
            Choose a receiving bank account and complete your payout request.
          </Text>
          <Divider />
          <Stack pt={2}>
            <BankSearch />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default WithdrawCash;
