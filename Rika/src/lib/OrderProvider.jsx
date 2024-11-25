import { createContext, useContext } from "react";


const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({children}) => {

    const orderData = async (id) => {
        try{
            const response = await fetch(`https://rika-payment.azurewebsites.net/orders/${id}`)
            if (!response.ok){
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            const result= await response.json();
            return result;
        }
        catch (err){
            console.log(err);
            return {};
        }
    }

    return (
        <OrderContext.Provider value={{ orderData }}>
            {children}
        </OrderContext.Provider>
    );
}