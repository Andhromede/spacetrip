import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  productsInBasket,
  deleteAllToBasket,
} from "../../redux-store/basketSlice";
import { useNavigate } from "react-router-dom";
import { createBooking } from "./../../api/backend/booking";

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const tabProducts = useSelector(productsInBasket);
  const user = useSelector((state) => (state.auth.user.id));
  const token = useSelector((state) => (state.auth.token));
  
  let totalPrice = 0;
  let total_Price = 0;
  let startDate;
  let endDate;
  let bookingDate;
  let paymentDate;
  let status = "valide";
  let nbPersons;                                                     
  let premium;
  let housing;

  {
    tabProducts.map((item) => {
      total_Price += item.totalPrice * 100;
      return total_Price;
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8080/api/stripe/charge",
          {
            amount: total_Price,
            id: id,
          }
        );
        if (response.data.success){
          {tabProducts.map((booking) => { 
            startDate = new Date(booking.startDate)
            endDate =  new Date(booking.endDate)
            totalPrice = booking.totalPrice
            bookingDate = new Date()
            paymentDate= new Date()
            nbPersons = booking.quantity                                                        
            premium = booking.premium
            housing = [booking._id]
            const values = {startDate,endDate,bookingDate,paymentDate,status,nbPersons,premium,user,housing,totalPrice};
        
            return (
              createBooking(values,token)
            .then(() => {
              console.log("ok")
            })
            .catch((error) => error)
            )})
          }}
          setTimeout(() => {
            navigate(URL_LOGIN);
        }, 3000);
      toast.success("Paiement réussi");
      dispatch(deleteAllToBasket());
         
        
        } catch (error) {
          console.log("Erreur!", error);
        }
    } else {
      console.log(error.message);
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
      <ToastContainer autoClose={3500} theme="dark" position="bottom-right" />
      <CardElement
        options={{
          hidePostalCode: true,
        }}
      />
      <div className=" mt-4 col-span-4">
        <button
          className="block w-full rounded-lg bg-black p-1 text-sm text-white"
          type="submit"
        >
          Payer
        </button>
      </div>
    </form>
  );
};
