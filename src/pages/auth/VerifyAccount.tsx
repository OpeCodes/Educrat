import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVerifyAccount } from "../../hooks/auth";
const VerifyAccount = () => {
  const { code, token } = useParams();
 const {verifyAccount}= useVerifyAccount();
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
