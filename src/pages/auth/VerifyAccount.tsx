import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVerifyAccount } from "../../hooks/auth";
import { Flex, Stack, Text } from "@chakra-ui/react";
const VerifyAccount = () => {
  const { code, token } = useParams();
  const { verifyAccount, isPending } = useVerifyAccount();
  useEffect(() => {
    verifyAccount({ code, token });
  }, [code, token]);
  return (
    <Stack>
      <Flex
        h={"100vh"}
        flexDirection={"column"}
        align={"center"}
        justify={"center"}
      >
        <Text></Text>
        {isPending ? <Text fontSize={"1.5rem"}>verifying...</Text> : <></>}
      </Flex>
    </Stack>
  );
};

export default VerifyAccount;
