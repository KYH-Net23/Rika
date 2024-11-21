import { useState } from "react";
import { useShippingContext } from "../../../../lib/ShippingOptionsProvider";
import InputField from "../../fields/InputField";

const ShippingForm = ({ clickFunc }) => {
  const { getServicePoints, getTransitTimes, setSelectedShippingDetails } =
    useShippingContext();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    postalCode: "",
  });
  const [servicePoints, setServicePoints] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [transitTime, setTransitTime] = useState([]);
  const [filterIndex, setFilterIndex] = useState("");

  const validate = () => {
    const errors = {};
    if (!formData.postalCode) errors.postalCode = "Postal code is required.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
      setIsConfirmed(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Shipping options submitted", formData);
      setLoading(true);
      try {
        const result = await getServicePoints(formData);
        if (result) {
          console.log("Service points successfully shown:", result);
          setServicePoints(result);
          setErrors({});
        } else {
          setServicePoints([]);
          setErrors({ postalCode: "No service points found." });
        }
      } catch (error) {
        console.error("Error showing service points:", error);
        setErrors({
          postalCode: "Failed to load service points. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCardClick = async (servicePoint, filterIndex) => {
    setSelectedLocation(servicePoint);
    setFilterIndex(filterIndex);
    console.log("Selected service point:", servicePoint);

    try {
      const transitData = await getTransitTimes(
        servicePoint.visitingAddress.postalCode
      );
      console.log("Transit time data:", transitData);
      setTransitTime(transitData || []);
    } catch (error) {
      console.error("Error fetching transit times:", error);
      setTransitTime([]);
    }
  };

  const handleDeliveryOption = (option) => {
    setSelectedDeliveryOption(option);
  };

  const handleConfirm = () => {
    if (selectedDeliveryOption && selectedLocation) {
      const shippingDetails = {
        servicePoint: selectedLocation,
        deliveryOption: selectedDeliveryOption,
      };
      setSelectedShippingDetails(shippingDetails);
      console.log("saved shipping details to context", shippingDetails);

      localStorage.setItem("shippingInformation", JSON.stringify(shippingDetails))

      const dropdownIds = ["postnord-select", "dhl-select", "instabox-select"];
      dropdownIds.forEach((id) => {
        if (id !== `${filterIndex.toLowerCase()}-select`) {
          const dropdown = document.getElementById(id);
          if (dropdown) {
            dropdown.selectedIndex = 0;
            dropdown.options[0].text = "-- Select a service point --";
          }
        }
      });
      setSelectedLocation(null);
      setSelectedDeliveryOption(null);
      setIsConfirmed(true);
      const servicePointSelected = document.getElementById(
        `${filterIndex.toLowerCase()}-select`
      );
      if (servicePointSelected) {
        servicePointSelected.options[0].text = `${selectedLocation.name}, ${selectedDeliveryOption.serviceInformation.name}`;
      }
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      {/* Form Section */}
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="w-full">
          {/* Postal Code Input */}
          <InputField
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            type="text"
            error={errors.postalCode}
          />

          {/* Submit Button */}
          <button
            id="showServicePoints"
            type="submit"
            className="flex gap-5 justify-center px-4 py-1.5 w-full bg-black rounded-xl leading-[33.28px] text-white transition-transform duration-200 transform hover:scale-105 hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Show Service Points"}
          </button>
        </form>
      </div>

      {/* Service Points PostNord Section */}
      {servicePoints.length > 0 && (
        <div className="w-full max-w-md">
          <div className="flex justify-center">
            <img
              src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/688/PostNord-logo-1024.png"
              alt="Postnord"
              className="w-40 -mb-16 -mt-6"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="postnord-select"
              className="block font-bold text-gray-700 mb-2"
            >
              Select a PostNord Service Point:
            </label>
            <select
              id="postnord-select"
              className="w-full p-2 border rounded shadow bg-white cursor-pointer"
              onChange={(e) =>
                handleCardClick(
                  servicePoints.find(
                    (point) => point.servicePointId === e.target.value
                  ),
                  "PostNord"
                )
              }
              value={selectedLocation?.servicePointId || ""}
            >
              <option value="" disabled>
                -- Select a service point --
              </option>
              {servicePoints.map((point) => (
                <option key={point.servicePointId} value={point.servicePointId}>
                  {`${point.name} - ${point.visitingAddress?.streetName}, ${point.visitingAddress?.city}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Service Points DHL Section */}
      {servicePoints.length > 0 && (
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-center">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/08/DHL-Emblem.png"
              alt="DHL"
              className="w-40 -mb-8"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="dhl-select"
              className="block font-bold text-gray-700 mb-2"
            >
              Select a DHL Service Point:
            </label>
            <select
              id="dhl-select"
              className="w-full p-2 border rounded shadow bg-white cursor-pointer"
              onChange={(e) =>
                handleCardClick(
                  servicePoints.find(
                    (point) => point.servicePointId === e.target.value
                  ),
                  "DHL"
                )
              }
              value={selectedLocation?.servicePointId || ""}
            >
              <option value="" disabled>
                -- Select a service point --
              </option>
              {servicePoints.map((point) => (
                <option key={point.servicePointId} value={point.servicePointId}>
                  {`${point.name} - ${point.visitingAddress?.streetName}, ${point.visitingAddress?.city}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Service Points Instabox Section */}
      {servicePoints.length > 0 && (
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-center">
            <img
              src="https://www.handelstrender.se/app/uploads/2020/10/instabox-logotyp.jpg"
              alt="Instabox"
              className="w-40 -mb-3"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="instabox-select"
              className="block font-bold text-gray-700 mb-2"
            >
              Select an Instabox Service Point:
            </label>
            <select
              id="instabox-select"
              className="w-full p-2 border rounded shadow bg-white cursor-pointer"
              onChange={(e) =>
                handleCardClick(
                  servicePoints.find(
                    (point) => point.servicePointId === e.target.value
                  ),
                  "Instabox"
                )
              }
              value={selectedLocation?.servicePointId || ""}
            >
              <option value="" disabled>
                -- Select a service point --
              </option>
              {servicePoints.map((point) => (
                <option key={point.servicePointId} value={point.servicePointId}>
                  {`${point.name} - ${point.visitingAddress?.streetName}, ${point.visitingAddress?.city}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Modal for Selected Location */}
      {selectedLocation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-md">
            <h3 className="font-bold text-gray-800 mb-4">
              Selected Pickup Location
            </h3>
            <p>
              <strong>Name:</strong> {selectedLocation.name}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {`${selectedLocation.visitingAddress?.streetName}, ${selectedLocation.visitingAddress?.streetNumber} ${selectedLocation.visitingAddress?.city}`}
            </p>
            <p>
              <strong>Service Point ID:</strong>{" "}
              {selectedLocation.servicePointId}
            </p>

            {/* Transit Time Information */}
            {transitTime && transitTime.length > 0 ? (
              <div className="mt-4">
                <p className="mb-1 text-gray-800">
                  <strong>Delivery Options:</strong>
                </p>
                <ul className="space-y-2">
                  {transitTime
                    .filter((_, index) => {
                      if (filterIndex === "PostNord") {
                        return [3, 5, 9].includes(index);
                      } else if (filterIndex === "DHL") {
                        return index === 8;
                      } else if (filterIndex === "Instabox") {
                        return index === 8;
                      }
                      return false;
                    })
                    .map((time, index) => {
                      const prices = {
                        0: 349,
                        1: 249,
                        2: 169,
                        3: 119,
                      };

                      const price = prices[index] || 0;

                      return (
                        <li
                          key={index}
                          onClick={() =>
                            handleDeliveryOption({
                              ...time,
                              price,
                            })
                          }
                          className={`p-2 border rounded cursor-pointer shadow hover:bg-green-200 ${
                            selectedDeliveryOption === time
                              ? "bg-green-200 border-green-500"
                              : "bg-gray-100"
                          }`}
                        >
                          <p>
                            <strong>Type:</strong>{" "}
                            {time.serviceInformation?.name || "N/A"}
                          </p>
                          <p>
                            <strong>Arrival:</strong>{" "}
                            {new Date(time.timeOfArrival).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Price:</strong> {price} kr
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ) : (
              <p className="mt-4 text-red-500">
                Transit time information is unavailable.
              </p>
            )}

            <button
              onClick={handleConfirm}
              className={`mt-4 w-full bg-green-800 text-white p-2 rounded hover:bg-gray-800`}
              hidden={!selectedLocation || !selectedDeliveryOption}
            >
              Confirm Delivery
            </button>
          </div>
        </div>
      )}

      {/* Proceed to Payment Button */}
      <div className="w-full max-w-md mt-3">
        {isConfirmed && (
          <button
            id="proceedToPaymentButton"
            onClick={clickFunc}
            className="flex gap-5 justify-center px-4 py-1.5 w-full bg-black rounded-xl leading-[33.28px] text-white transition-transform duration-200 transform hover:scale-105 hover:bg-gray-700"
            disabled={!isConfirmed || loading}
          >
            {loading ? "Loading..." : "Payment Options"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShippingForm;
