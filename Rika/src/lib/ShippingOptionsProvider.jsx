import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ShippingContext = createContext();

export const useShippingContext = () => useContext(ShippingContext);

export const ShippingProvider = ({ children }) => {
  const [notFound, setNotFound] = useState(false);
  const [selectedShippingDetails, setSelectedShippingDetails] = useState(null);

  // Fetch ServicePoints from API
  const getServicePoints = async (formData) => {
    const { postalCode } = formData;
    try {
      const response = await fetch(
        `https://shoppingprovider-d5dgaegpcmgugphy.westeurope-01.azurewebsites.net/Shipping/ServicePoints?postalCode=${postalCode}&numberOfServicePoints=4`
      );
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (err) {
      console.log(err);
      setNotFound(true);
      return null;
    }
  };

  //Fetch Transit Times from API
  const getTransitTimes = async (destinationPostalCode) => {
    try {
      const response = await fetch(
        `https://shoppingprovider-d5dgaegpcmgugphy.westeurope-01.azurewebsites.net/Shipping/TransitTimes?DestinationPostalCode=${destinationPostalCode}`
      );
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return (
    <ShippingContext.Provider
      value={{
        getServicePoints,
        getTransitTimes,
        notFound,
        selectedShippingDetails,
        setSelectedShippingDetails,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

ShippingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
