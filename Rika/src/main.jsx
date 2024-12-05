import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./lib/ProtectedRoute.jsx";
import { OrderProvider } from "./lib/OrderProvider.jsx";
import { AuthProvider } from "./lib/AuthProvider.jsx";
import { ProductProvider } from "./lib/ProductProvider.jsx";
import { ShippingProvider } from "./lib/ShippingOptionsProvider.jsx";
import { PaymentProvider } from "./lib/PaymentProvider.jsx";
import { InvoiceProvider } from "./lib/InvoiceProvider";
import { LoggingProvider } from "./lib/LoggingProvider.jsx";

import "./assets/css/main.css";

import Header from "./views/sections/header/Header";
import Home from "./views/Home";
import ReturnFromPayment from "./views/payment/ReturnFromPayment";
import Login from "./views/Login.jsx";
import CustomerLandingPage from "./views/customerpages/CustomerLandingPage.jsx";
import AdminLandingPage from "./views/adminpages/AdminLandingPage.jsx";
import Products from "./views/Products";
import ProductDetails from "./views/ProductDetails";
import EditProduct from "./views/EditProduct";


import CreateProduct from "./views/CreateProduct";
import Users from "./views/Users";
import RedirectToPaymentForm from "./views/payment/RedirectToPaymentForm.jsx";
import Register from "./views/Register.jsx";
import AllInvoices from "./views/Invoice/AllInvoices.jsx";
import Checkout from "./views/Checkout.jsx";
import ProductReturnPage from "./views/customerpages/Orders/Returns/ReturnPage.jsx";
import OrderConfirmation from "./views/OrderConfirmation.jsx";
import AllInventories from "./views/inventory/AllInventories.jsx";
import CreateInventory from "./views/inventory/CreateInventory.jsx";
import ReadInventories from "./views/inventory/ReadInventories.jsx";
import ErrorNotExisting from "./views/ErrorNotExisting.jsx";
import UpdateInventories from "./views/inventory/UpdateInventories.jsx";
import DeleteInventory from "./views/inventory/DeleteInventory.jsx";
import ConfirmEmail from "./views/ConfirmEmail.jsx";
import ForgotYourPassword from "./views/ForgotYourPassword.jsx";
import ResetPassword from "./views/ResetPassword.jsx";

import ReportsAndAnalytics from "./views/adminpages/ReportsAndAnalytics.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoggingProvider>
        <OrderProvider>
          <InvoiceProvider>
            <AuthProvider>
              <ProductProvider>
                <ShippingProvider>
                  <PaymentProvider>
                    <Header />
                    <div className="px-4 pt-10 pb-[86px]">
                      <Routes>
                      <Route path="/confirm" element={<ConfirmEmail />} />
                      <Route
                        path="/error-not-existing"
                        element={<ErrorNotExisting />}
                      />
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                          path="/productdetails/:id"
                          element={<ProductDetails />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route
                          path="/productscreate"
                          element={<CreateProduct />}
                        />
                        <Route
                          path="/admin/edit-product/:id"
                          element={<EditProduct />}
                        />
                        <Route path="/users" element={<Users />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                          path="/paymentformtest"
                          element={<RedirectToPaymentForm />}
                        />
                        <Route
                          path="/productReturn"
                          element={<ProductReturnPage />}
                        />
                          <Route path="/return" element={<ReturnFromPayment />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route
                          path="/customer"
                          element={
                            <ProtectedRoute requiredRole="Customer">
                              <CustomerLandingPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin"
                          element={
                            <ProtectedRoute requiredRole="Admin">
                              <AdminLandingPage />
                            </ProtectedRoute>
                          }
                      />
                      <Route
                        path="/forgotpassword"
                        element={<ForgotYourPassword />}
                      />

                      <Route
                        path="/resetpassword/:id"
                        element={<ResetPassword />}
                      />

                        <Route 
                          path="/reportsandanalytics" 
                          element={
                            <ProtectedRoute requiredRole="Admin">
                              <ReportsAndAnalytics />
                            </ProtectedRoute>
                          } 
                        />

                        <Route
                          path="/all-invoices"
                          element={
                            <ProtectedRoute requiredRole="Admin">
                              <AllInvoices />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/orderconfirmation"
                          element={<OrderConfirmation />}
                        />
                      <Route
                        path="/all-inventories"
                        element={<AllInventories />}
                      />
                      <Route
                        path="/create-inventory"
                        element={<CreateInventory />}
                      />
                      <Route
                        path="/read-inventories"
                        element={<ReadInventories />}
                      />
                      <Route
                        path="/update-inventories"
                        element={<UpdateInventories />}
                      />
                      <Route
                        path="/delete-inventory"
                        element={<DeleteInventory />}
                      />
                      </Routes>
                    </div>
                  </PaymentProvider>
                </ShippingProvider>
              </ProductProvider>
            </AuthProvider>
          </InvoiceProvider>
        </OrderProvider>
      </LoggingProvider>
    </BrowserRouter>
  </StrictMode>,
);
