import { useState, useEffect, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/ChekoutFrom/CheckoutForm";

const Payment = () => {
  // We need useRef to handle useEffect being called twice since React 18 in Strict Mode
  const loadStripeCalled = useRef(false);
  const getClientSecretCalled = useRef(false);

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!loadStripeCalled.current) {
      console.log("load stripe called");
      fetch("/api/payment/config").then(async (response) => {
        const { publishableKey } = await response.json();
        setStripePromise(loadStripe(publishableKey));
      });
    }

    return () => {
      loadStripeCalled.current = true;
    };
  }, []);

  useEffect(() => {
    if (!getClientSecretCalled.current) {
      console.log("get client secret called");
      fetch("/api/payment/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({}),
      }).then(async (response) => {
        const { clientSecret } = await response.json();
        console.log(clientSecret);
        setClientSecret(clientSecret);
      });
    }
    return () => {
      getClientSecretCalled.current = true;
    };
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
