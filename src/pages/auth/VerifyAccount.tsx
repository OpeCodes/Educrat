import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import  customFetch  from "../../utils/axios";
const VerifyAccount = () => {
  const { code, token } = useParams();
  const toast = useToast();
  const { mutate: verifyAccount } = useMutation({
    mutationFn: (user: any) => customFetch.post("user/verifyAccount", user),
    onSuccess: () => {
      toast({
        title: `verification successful`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: `${error.response.data.error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  useEffect(() => {
    verifyAccount({ code, token });
  }, [code, token]);
  return (
    <div>
      <h1>Account Verification Page</h1>
    </div>
  );
};

export default VerifyAccount;
