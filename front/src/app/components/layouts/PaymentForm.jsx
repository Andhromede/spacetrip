import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import {  profilUpdate } from "../../api/backend/profil";
import { profilGet } from '../../api/backend/profil';
import ProfilSchema from "../../schema-yup/profil-yup";
import { useSelector, useDispatch } from "react-redux";
// import { Login } from "../../api/backend/account";
// import Login from '../account/Login';
import { ToastContainer, toast } from "react-toastify";
import StripeContainer from '../stripe/StripeContainer';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
   productsInBasket,
   deleteAllToBasket,
 } from "../../redux-store/basketSlice";
 import { useNavigate } from "react-router-dom";
 import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";
 import { createBooking } from "./../../api/backend/booking";



const FormPayment = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
    const [nuser, getUser] = useState();
    const [error, setError] = useState(null);
    // let {id} = useParams(); 
    const user = useSelector((state) => (state.auth.user.id));
    const token = useSelector((state) => (state.auth.token));

    const tabProducts = useSelector(productsInBasket);
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
    
   
    useEffect(() => {
        profilGet(user,token)
          .then((res) => {
            if (res.status === 200) {
              getUser(res.data);
            }
          })
          .catch((err) => {
            console.log(err)});
      },[]);
    

      const handleProfil = (values) => {
        profilUpdate(values, user,token)
        .then((res) => {
          if (res.status === 200 && res.data) {
            toast.success("Vos informations ont bien été mis à jour.");
          }
        })
        .catch((err) => {
          console.log(err)});
      }

      if(!nuser){
        return (<div>Chargement</div>)
      }

      tabProducts.map((item) => {
         total_Price += item.totalPrice ;
         return total_Price;
      });


      return (
        <div className="brGradient py-12 md:py-24 border-zinc-200 border-2">
            <ToastContainer autoClose={3500} theme="dark" position="bottom-right" />
            <div className="mx-auto max-w-lg px-4 lg:px-8">
            <div className="mb-2 mt-6 block text-[20px] text-white font-bold" > Mes Coordonnées :</div>
                <Formik
                    validationSchema={ProfilSchema}
                    initialValues={{
                    firstName : nuser.firstName,
                    lastName :nuser.lastName,
                    email : nuser.email,
                    address : nuser.address,
                    city : nuser.city,
                    zipCode : nuser.zipCode,
                    country : nuser.country,
                    phone : nuser.phone,
                    }}
                    onSubmit={(nuser) => {
                        handleProfil(nuser);
                    }}
                >
                {({ handleChange, handleBlur, values, touched, errors, }) => (
                    
                    <Form className="grid grid-cols-6 gap-4">
                                {/* PRENOM */}
                                <div className="col-span-3">
                                    <label className="mb-1 block text-md text-white font-bold" htmlFor="first_name">Prénom</label>
                                        <Field
                                            type="text"
                                            name="firstName"
                                            placeholder={"Prénom"}
                                            value={values.firstName}
                                            className={errors.firstName && touched.firstName?"border-2 border-rose-600 w-full rounded-[10px]":"border-2 w-full rounded-[10px]"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.firstName && touched.firstName && <p className='error text-[#ff0000]'>{errors.firstName}</p>}
                                </div>

                                {/* NOM */}
                                <div className="col-span-3">
                                    <label className="mb-1 block text-md text-white font-bold" htmlFor="last_name">Nom</label>
                                    <Field
                                        type="text"
                                        name="lastName"
                                        placeholder={"Nom" }
                                        value={values.lastName}
                                        className={errors.lastName && touched.lastName?"border-2 border-rose-600 w-full rounded-[10px]":"border-2 w-full rounded-[10px]"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.lastName && touched.lastName && <p className='error text-[#ff0000]'>{errors.lastName}</p>}
                                </div>

                                {/* EMAIL */}
                                <div className="col-span-6">
                                    <label className="mb-1 block text-md text-white font-bold" htmlFor="email">Email</label>
                                    <Field
                                        type="text"
                                        name="email"
                                        autoComplete="email"
                                        className={errors.email && touched.email?"border-2 border-rose-600 w-full rounded-[10px]":"border-2 w-full rounded-[10px]"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email && <p className='error text-[#ff0000]'>{errors.email}</p>}  
                                </div>

                                {/* TELEPHONE */}
                                <div className="col-span-6">
                                    <label className="mb-1 block text-md text-white font-bold" htmlFor="phone">Téléphone</label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        placeholder={"Téléphone"}
                                        value={values.phone}
                                        className={errors.phone && touched.phone ? "border-2 border-rose-600 w-full rounded-[10px]" : "border-2 w-full rounded-[10px]"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.phone && touched.phone && <p className='error text-[#ff0000]'>{errors.phone}</p>}
                                </div>

                                 {/* ADRESSE */}
                                 <fieldset className="col-span-6">
                                    <legend className="mb-1 block text-md text-white font-bold">Adresse</legend>

                                    <div className="-space-y-px rounded-lg bg-white shadow-sm">
                                       <div>
                                          <label className="sr-only" htmlFor="card-number">adresse</label>
                                          <Field
                                            type="text"
                                            name="address"
                                            placeholder={"Adresse" }
                                            value={values.address}
                                            className={errors.address && touched.address ? "border-2 border-rose-600 w-full rounded-[10px]" : "border-2 w-full rounded-[10px]"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                          />
                                          {errors.address && touched.address && <p className='error text-[#ff0000]'>{errors.address}</p>}
                                       </div>

                                       <div className="flex -space-x-px">
                                          <div className="flex-1">
                                             <label className="sr-only" htmlFor="code_postal">
                                                Code postal
                                             </label>

                                             <Field
                                                type="text"
                                                name="zipCode"
                                                placeholder={"Code Postal" }
                                                value={values.zipCode}
                                                className={errors.zipCode && touched.zipCode ? "border-2 border-rose-600 w-full rounded-[10px]" : "border-2 w-full rounded-[10px]"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                             />
                                             {errors.zipCode && touched.zipCode && <p className='error text-[#ff0000]'>{errors.zipCode}</p>} 
                                          </div>

                                          <div className="flex-1">
                                             <label className="sr-only" htmlFor="card-cvc">Ville</label>
                                             <Field
                                                type="text"
                                                name="city"
                                                placeholder={"Ville" }
                                                value={values.city}
                                                className={errors.city && touched.city ? "border-2 border-rose-600 w-full rounded-[10px]" : "border-2 w-full rounded-[10px]"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                             />
                                            {errors.city && touched.city && <p className='error text-[#ff0000]'>{errors.city}</p>} 
                                          </div>
                                       </div>
                                    </div>
                                 </fieldset>

                                 {/* PAYS */}
                                 <fieldset className="col-span-6">
                                    <legend className="mb-1 block text-md text-white font-bold">
                                       Pays
                                    </legend>

                                    <div className="-space-y-px rounded-lg bg-white shadow-sm">
                                       <div>
                                          <label className="sr-only" htmlFor="country">Pays</label>

                                          <Field
                                            type="text"
                                            name="country"
                                            placeholder={"Pays"}
                                            value={values.country}
                                            className={errors.country && touched.country ? "border-2 border-rose-600 w-full rounded-[10px]" : "border-2 w-full rounded-[10px]"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                          />
                                          {errors.country && touched.country && <p className='error text-[#ff0000]'>{errors.country}</p>}
                                       </div>
                                    </div>
                                 </fieldset>


                                 {/* BTN VALIDATION */}
                                 <div className="col-span-6">
                                    <button className="mb-6 block w-full rounded-lg bg-black p-2.5 text-sm text-white" type="submit">
                                       Valider les informations
                                    </button>
                                 </div>
                              </Form>
                                )}
                              </Formik>

                              {/* CARTE */}
                              <div className="mb-1 mt-6 block text-[20px] text-white font-bold" > Paiement par carte :</div>
                                <fieldset className="col-span-6 ">
                                    <legend className="mb-1 mt-6 block text-md text-white font-bold">Carte</legend>
                                    <fieldset className="col-span-6 bg-white ">
                                     <StripeContainer/>
                                    </fieldset>  
                                </fieldset>

                              {/* PAYPAL */}
                              <div className="mb-1 mt-6 block text-[20px] text-white font-bold" > ou avec Paypal :</div>
                              <fieldset className="col-span-6 ">
                                    <legend className="mb-1 mt-6 block text-md text-white font-bold">Paypal</legend>
                                    <fieldset className="col-span-6 bg-white ">
                                       <PayPalScriptProvider options={{ "client-id": "AYg3gub96BrDiBTzH4kLDsFNjphFzH2E3CJjBXbgGeAkq3muOe3uwNaPWYOeCKdKEQd8wKDx0WCFV4nm", "currency" : "EUR" }}>
                                          <PayPalButtons 
                                          style={{ layout: "horizontal" }}
                                          createOrder={(data, actions) => {
                                             return actions.order.create({
                                             purchase_units: [
                                                {
                                                   description: "SpaceTrip",
                                                   amount:{
                                                      value: total_Price
                                                   },                                
                                                },
                                             ],
                                          });
                                          }} 
                                          onApprove={(data,actions) => {
                                             return actions.order.capture()
                                             .then(() => {
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
                                                      createBooking(
                                                         values,
                                                         token
                                                      )
                                                      .then(() => {
                                                        console.log("ok");
                                                      })
                                                   })}
                                                   setTimeout(() => {
                                                      navigate(URL_LOGIN);
                                                  }, 3000);
                                                  toast.success("Paiement réussi")
                                                  dispatch(deleteAllToBasket())
                                                      
                                             })
                                             .catch((error) => error); 
          
                                          }}
                                          onError={(err) => {
                                             setError(err);
                                             console.error(err);
                                          }}/>
                                       </PayPalScriptProvider>
                                    </fieldset>  
                                </fieldset>
                           </div>
                        </div>
      );
   
      };

export default FormPayment;
