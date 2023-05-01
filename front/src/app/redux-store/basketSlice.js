import { createSlice } from "@reduxjs/toolkit";
// import { checkBookingDate, calculPriceTravel, dateDiff } from "../../constants/functions";
import { checkBookingDate, dateDiff } from "../constants/functions";

const initialState = {
   products: [],
   totalPrice: 0,
};

const minQte = 1;


export const basketSlice = createSlice({
   name: "basket",
   initialState: initialState,

   reducers: {

      /******** Modify the premium value (Nath) ********/
      changePremiumInBasket: (state, action) => {
         const productInBasket = state.products.find((item) => item._id === action.payload._id);
         let dureeSejour = dateDiff(new Date(productInBasket.startDate), new Date(productInBasket.endDate));
         let priceTravel = productInBasket.price * dureeSejour;

         if (productInBasket.premium === true) {
            productInBasket.premium = false;
            productInBasket.totalPrice = priceTravel * productInBasket.quantity;
         }
         else {
            productInBasket.premium = true;
            productInBasket.totalPrice = (priceTravel + 300) * productInBasket.quantity;
         }
      },


      /******** Add or increase in the basket (Nath) ********/
      addToBasket: (state, action) => {
         let productInBasket = state.products.find((item) => item._id === action.payload._id);
         let dureeSejour = dateDiff(new Date(productInBasket.startDate), new Date(productInBasket.endDate));
         let priceTravel = productInBasket.price * dureeSejour;

         if (productInBasket) {
            productInBasket.startDate = action.payload.startDate;
            productInBasket.endDate = action.payload.endDate;

            if (action.payload.quantity < productInBasket.nbrPersons) {
               productInBasket.quantity++;
            }

            if (action.payload.premium == true) {
               productInBasket.totalPrice = (priceTravel + 300) * productInBasket.quantity;
            } else {
               productInBasket.totalPrice = priceTravel * productInBasket.quantity;
            }

         }
         else if (!productInBasket) {
            state.products.push({ ...action.payload, quantity: minQte });
         }

         // state.totalPrice += productInBasket.totalPrice;
      },


      /******** Decrease in the basket (Nath) ********/
      removeToBasket: (state, action) => {
         const productInBasket = state.products.find((item) => item._id === action.payload._id);
         let dureeSejour = dateDiff(new Date(productInBasket.startDate), new Date(productInBasket.endDate));
         let priceTravel = productInBasket.price * dureeSejour;

         if (productInBasket && productInBasket.quantity >= 2) {
            productInBasket.quantity--;
            productInBasket.startDate = action.payload.startDate;
            productInBasket.endDate = action.payload.endDate;
            // state.qte--;

            if (action.payload.premium === true) {
               productInBasket.totalPrice = priceTravel * productInBasket.quantity;
            } else {
               productInBasket.totalPrice = (priceTravel + 300) * productInBasket.quantity;
            }
         }
         //TODO implémenter les qte ???

         // else if(productInBasket && productInBasket.quantity === 0) {
         //    state.products = state.products.filter((item) => item._id !== action.payload._id);
         //    state.qte -= productInBasket.quantity;
         // }
      },


      /******** Remove to the basket (Nath) ********/
      deleteToBasket: (state, action) => {
         const productInBasket = state.products.find((item) => item._id === action.payload._id);

         if (productInBasket) {
            state.products = state.products.filter((item) => item._id !== action.payload._id);
         }
      },

      /******** Delete All to the basket  ********/
      deleteAllToBasket: (state) => {
         state.products = [];
      },


      /******** Add or modify the basket (Caro) ********/
      addProductInBasket: (state, action) => {

         let productInBasket = state.products.find(
            (item) => item._id === action.payload._id
         );

         if (!productInBasket) {
            state.products.push({ ...action.payload, quantity: action.payload.quantity });
         }

         else {
            productInBasket.startDate = action.payload.startDate;
            productInBasket.endDate = action.payload.endDate;
            productInBasket.quantity = action.payload.quantity;
            productInBasket.totalPrice = action.payload.totalPrice;
            productInBasket.premium = action.payload.premium;
         }
      },

   },
});

export const { addToBasket, removeToBasket, addProductInBasket, deleteToBasket, changePremiumInBasket,deleteAllToBasket } = basketSlice.actions;
export const basketTotalPrice = (state) => state.basket.totalPrice;
export const productsInBasket = (state) => state.basket.products;
export default basketSlice.reducer;
