import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Jpib6SCQeMYi7tftUiPhhpjDdocC7OKphTRtjM7VUE3qocwR30vJ2GUb0Rcc3wLQJePmK5nmbde0j9rdJ8jkeyT00NB0eukpp'
);
export const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch {
    showAlert('error', err);
  }
};
