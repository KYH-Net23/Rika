import RedirectToPaymentButton from "./RedirectToPaymentButton";

const RedirectToPaymentForm = () => {
  const testOrderDetails = {
    orderId: 10,
    emailAddress: "test@mail.se",
    address: "street 2",
    products: [
      { id: 1, model: "T-Shirt", quantity: 1, price: 1000 },
      { id: 2, model: "Boots", quantity: 2, price: 2000 },
    ],
    totalAmount: 4000,
    deliveryOption: {
      price: 349,
      serviceInformation: {
        name: "PostNord Pallet",
      },
      timeOfArrival: "2024-11-19T22:00:00",
      timeOfDeparture: "2024-11-18T19:20:00",
    },
    servicePoint: {
      name: "Stora Coop Huddinge",
      servicePointId: "530667",
      visitingAddress: {
        city: "HUDDINGE",
        countryCode: "SE",
        postalCode: "14147",
        streetName: "Forelltorget",
        streetNumber: "6",
      },
    },
  };
  return <RedirectToPaymentButton orderDetails={testOrderDetails} />;
};

export default RedirectToPaymentForm;
