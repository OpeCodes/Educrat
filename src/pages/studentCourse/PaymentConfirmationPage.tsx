import { useParams } from "react-router-dom";

const PaymentConfirmationPage = () => {
    const {tx_ref} = useParams()
    console.log(tx_ref,"tx_ref")
  return (
    <div>
      <h1>Payment Confirmation</h1>
      <p>Your payment was successful!</p>
    </div>
  );
};

export default PaymentConfirmationPage;
