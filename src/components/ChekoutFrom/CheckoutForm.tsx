import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      if (error.message) {
        setMessage(error.message);
      }
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <Box
      sx={{
        marginX: "auto",
        marginTop: "5rem",
      }}
    >
      <Box
        sx={{
          padding: "4rem 2rem",
          border: "1px solid grey",
          borderRadius: "4px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <Button
            disabled={isProcessing || !stripe || !elements}
            id="submit"
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginTop: "2rem" }}
          >
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
          </Button>
          {/* Show any error or success messages */}
          {message && <Typography className="error-message" variant="body1" component="p" sx={{
            textAlign: "center",
            marginTop: "1rem"
          }}>{message}</Typography>}
        </form>
      </Box>
    </Box>
  );
}
