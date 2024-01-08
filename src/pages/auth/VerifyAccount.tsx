import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccountThunk } from "../../features/user/UserSlice";
import type { RootState } from "../../store/store";
const VerifyAccount = () => {
  const { code, token } = useParams();
  const dispatch = useDispatch();
  const { verificationStatus } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(verifyAccountThunk({ code, token }));
  }, [dispatch, code, token]);
  return <div>
       <h1>Account Verification Page</h1>
      {verificationStatus === 'loading' && <p>Verifying...</p>}
      {verificationStatus === 'succeeded' && <p>Verification succeeded!</p>}
      {verificationStatus === 'failed' && <p>Verification failed!</p>}
  </div>;
};

export default VerifyAccount;
