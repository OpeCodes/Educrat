import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePaymentTransaction } from "../../hooks/auth/price";

const PaymentConfirmationPage = () => {
  const { tx_ref } = useParams();
  const { paymentTransaction, isPending } = usePaymentTransaction();
  useEffect(() => {
    paymentTransaction({ tx_ref });
  }, [tx_ref]);
  return (
    <div>
      <h1>Payment Confirmation</h1>
      {isPending ? "Verifying..." : <p>Your payment was successful!</p>}

    </div>
  );
};

export default PaymentConfirmationPage;
