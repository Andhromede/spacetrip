// DIVERS
import { React, useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../../assets/styles/components/admin.css";

// REQUESTS
import { destinations } from "../../api/backend/destination";
import { getUsers } from '../../api/backend/user';
import { updateBooking } from '../../api/backend/booking';
import { getBookingByHousing } from "../../api/backend/booking";

// REACT ICONS
import { BsFillPersonFill, BsFillHouseFill } from "react-icons/bs";
import { IoMdPlanet } from "react-icons/io";
import { RiMoneyEuroCircleFill } from "react-icons/ri";

import { checkBookingDate, dateDiff } from "../../constants/functions";



const Booking = ({
   isActive,
   setIsActive,
   index,
   booking: { startDate, endDate, bookingDate, paymentDate, status, nbPersons, premium, totalPrice, deleted, user, destination, housing, _id }
}) => {


   const notifyRed = (notification) => toast.error(notification);
   const notify = (notification) => toast.success(notification);
   const token = useSelector((state) => (state.auth.token));
   const [allDestinations, setAllDestinations] = useState([]);
   const [allUsers, setAllUsers] = useState();

   const initialValues = {
      startDate: new Date(startDate).toISOString().slice(0, 10),
      endDate: new Date(endDate).toISOString().slice(0, 10),
      bookingDate: new Date(bookingDate).toISOString().slice(0, 10),
      paymentDate: paymentDate ? new Date(paymentDate).toISOString().slice(0, 10) : "",
      status,
      nbPersons,
      premium,
      totalPrice,
      deleted,
      user,
      destination,
      housing
   };


   useEffect(() => {
      destinations()
         .then((result) => {
            setAllDestinations(result.data);
         })
         .catch((err) => console.log(err));

      getUsers(token)
         .then((res) => {
            if (res.status === 200) {
               setAllUsers(res.data);
            }
         })
         .catch((err) => console.log(err));
   }, []);



   /******** Delete l'image ********/
   const deleteFunction = () => {
      // TODO fonction de suppression
      console.log("deleted");
   }


   /******** Update the housing ********/
   const updateItem = (values) => {
      console.log(0, values);
      let nbrPersons = values.nbPersons;
      let selectedStartDate = new Date(values.startDate)
      let selectedendDate = new Date(values.endDate)
      let arrayBookingFree = [];

         getBookingByHousing(values.housing[0]._id)
            .then((bookingsHousing) => {
               bookingsHousing.data.map((booking) => {
                  let startDateCalendar = new Date(booking.startDate);
                  let endDateCalendar = new Date(booking.endDate);
                  let resultDate = checkBookingDate( startDateCalendar, endDateCalendar, selectedStartDate, selectedendDate);
                  if (!resultDate) {
                     arrayBookingFree.push(booking);
                  }
               });
               
               let timeTravel = dateDiff(selectedStartDate, selectedendDate);
               let priceTravel = values.housing[0].price * timeTravel;

               console.log(1, timeTravel);
               console.log(2, priceTravel);

               if (timeTravel < 6) {
                  notifyRed("La durée du séjour doit être de 7j minimum.");
               } 
               else if (arrayBookingFree.length > 0 && startDateCalendar !== selectedStartDate || endDateCalendar !== selectedendDate) {
                  notifyRed("Le logement est indisponible pour ces date.");
               } 
               else {
                  if (values.checked) {
                     values.totalPrice = (priceTravel + 300) * nbrPersons;
                  } 
                  else {
                     values.totalPrice = priceTravel * nbrPersons;
                  }

                  console.log(3, "Ces dates sont disponibles.");
                  notify("La réservation à bien été modifié.");

                  // updateBooking(_id, values, token)
                  // .then((res) => {
                  //    if (res.status === 200) {
                  //       notify("Modification effectuée !");
                  //    }
                  // })
                  // .catch((err) => {
                  //    notifyRed("Modification échouée !");
                  // });
               }
            })
            .catch((err) => console.log(err));

      // TODO les dates ne sont pas modifiées
   }


   return (
      <>
         {/* {booking && */}
         <div className="pb-16">
            <h1 className="text-center text-2xl mt-5">
               <span className="text-xl">Réservation n°: </span>
               <span className={`text-xl  ${isActive === index ? "text-[#D200FF] font-bold" : "text-white"}`}>{(_id)}</span>
            </h1>

            <div name="name" className="mx-auto tracking-wider text-2xl text-primary font-Starjedi text-center" id="name">{name}</div>

            <Formik enableReinitialize initialValues={initialValues} key={booking._id} onSubmit={(values) => updateItem(values)} div className="border-2 p-1" id="housing">
               {({ values }) => (
                  <Form>
                     <div className="flex-grow p-4 overflow-auto bg-zinc-800">
                        <div className={`bg-black mx-4 p-1 pb-8 mx-auto rounded-2xl ${isActive === index ? "border-2 border-[#D200FF]" : ""}`} onClick={() => setIsActive(index)}>

                           <fieldset className="text-secondary-light mx-auto mt-3 mb-6 grid grid-cols-12 ml-3 pb-5 pt-2">
                              <legend className="text-center px-3 text-2xl font-Starjedi text-primary ">logement</legend>

                              {/* TOTAL PRICE */}
                              <div className="flex gap-1 justify-center text-lg col-span-3 ml-5">
                                 <Field id="totalPrice" type="text" className="text-2xl whitePlaceholder rounded-lg bg-[#202020] mx-auto border-none w-full text-justify" name="totalPrice" value={values.totalPrice} />
                                 <RiMoneyEuroCircleFill className="text-terciary text-3xl my-auto" />
                              </div>

                              {/* NBR PERSONS */}
                              <div className="col-span-2 flex items-center justify-center text-xl gap-2 ml-6">
                                 <Field id="nbrPersons" type="text" className="text-2xl whitePlaceholder rounded-lg bg-[#202020] border-none text-justify w-8/12" name="nbPersons" value={values.nbPersons} />
                                 <BsFillPersonFill className="text-terciary text-2xl" />
                              </div>

                              {/* HOUSING */}
                              <div className="col-span-4 flex items-center justify-center text-xl gap-2 ">
                                 <Field id="housing" type="text" disabled className="text-2xl whitePlaceholder rounded-lg bg-[#202020] border-none text-justify w-8/12" name="housing" value={values.housing[0].name} />
                                 <BsFillHouseFill className="text-terciary text-2xl" />
                              </div>

                              {/* SELECT PLANET */}
                              <div className="col-span-3 flex justify-centeritems-center text-xl grid grid-cols-12" >
                                 <Field as='select' id="destination" name="destination" className="col-span-8 bg-[#202020] rounded mt-2" disabled>
                                    {allDestinations.map((destinationMapItem) => {
                                       return (
                                          <option key={destinationMapItem._id} value={destinationMapItem._id} selected={destinationMapItem._id === housing[0].destination._id} >
                                             {destinationMapItem.name}
                                          </option>
                                       );
                                    })}
                                 </Field>

                                 <IoMdPlanet className="col-span-4 text-terciary text-2xl ml-2 mt-3" />
                              </div>
                           </fieldset>

                           {/* DATES */}
                           <fieldset className="mx-3 py-5 px-4">
                              <legend className="text-center px-3 text-2xl font-Starjedi text-primary">reservation</legend>

                              <div className="grid grid-cols-12">
                                 <div className="col-span-2 text-right pr-5">
                                    <div className="text-terciary text-xl">Du</div>
                                    <div className="text-terciary text-xl mt-8">Reservation</div>
                                    <div className="text-terciary text-xl mt-8">Utilisateur</div>
                                 </div>

                                 <div className="col-span-4 grid-2">
                                    <Field id="startDate" type="date" className="w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="startDate" value={values.startDate} />
                                    <Field id="bookingDate" type="date" className="mt-5 w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="bookingDate" value={values.bookingDate} />
                                    {/* <Field type="date" className="w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="startDate" value={new Date(values.startDate).toISOString().slice(0, 10)} />
                                       <Field type="date" className="mt-5 w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="bookingDate" value={new Date(values.bookingDate).toISOString().slice(0, 10)} /> */}

                                    <Field as='select' id="user" name="user" className="w-full bg-[#202020] rounded-lg mt-5">
                                       <option key={_id}>-- Anonyme --</option>

                                       {allUsers &&
                                          allUsers.map((userMapItem) => {
                                             return (
                                                <option key={userMapItem._id} value={userMapItem._id} selected={userMapItem._id === user}>
                                                   {userMapItem.email}
                                                </option>
                                             );
                                          })
                                       }
                                    </Field>
                                 </div>

                                 <div className="col-span-2 text-right pr-5">
                                    <div className="text-terciary text-xl">Au</div>
                                    <div className="text-terciary text-xl mt-8">Paiement</div>
                                    <div className="text-terciary text-xl mt-8">Status</div>
                                 </div>

                                 <div className="col-span-4 ">
                                    <Field id="endDate" type="date" className="w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="endDate" value={values.endDate} />
                                    <Field id="paymentDate" type="date" className="mt-5 w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="paymentDate" value={values.paymentDate} />

                                    <Field as='select' id="status" name="status" className="w-full bg-[#202020] rounded-lg mt-5">
                                       <option key="validé" value="validé" selected={values.status === status}>valide</option>
                                       <option key="annulé" value="annulé" selected={values.status === status}>annulé</option>
                                       <option key="demande de remboursement" value="demande de remboursement" selected={values.status === status}>demande de remboursement</option>
                                       <option key="remboursé" value="remboursé" selected={values.status === status}>remboursé</option>
                                    </Field>
                                 </div>
                              </div>
                           </fieldset>

                           {/* DETAIL */}
                           <div className="mx-auto p-4 text-lg justify-between tracking-wider justify-center grid grid-cols-12">
                              <div className="flex mx-auto col-span-12">

                                 {/* PREMIUM */}
                                 <label className="inline-flex relative mr-5 cursor-pointer ml-5 mt-4">
                                    <Field type="checkbox" checked={values.premium} className="sr-only peer" name="premium" onClick={() => notifyRed("N'oubliez pas de valider votre choix !")} />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-focus:ring-zinc-700 bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-red-600 peer-checked:bg-red-600"></div>
                                    <span className="ml-3 text-sm font-medium text-white">Premium</span>
                                 </label>

                                 {/* CHECKBOX DELETED */}
                                 <label className="inline-flex relative mr-5 cursor-pointer ml-5 mt-4">
                                    <Field type="checkbox" checked={values.deleted} className="sr-only peer" name="deleted" onClick={() => notifyRed("N'oubliez pas de valider votre choix !")} />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-focus:ring-zinc-700 bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-red-600 peer-checked:bg-red-600"></div>
                                    <span className="ml-3 text-sm font-medium text-white">Deleted</span>
                                 </label>
                              </div>
                           </div>

                           {/* VALIDATION BTN */}
                           <div className="w-full flex">
                              <button className="mx-auto w-4/12 text-center mt-6 py-2 text-emerald-400 font-bold text-xl tracking-widest font-Starjedi hover:bg-emerald-400 hover:text-black border-2 border-zinc-700 rounded-xl border-dashed" type="submit">
                                 <span className="mt-4 mx-auto my-auto">valider</span>
                              </button>
                           </div>
                        </div >
                     </div >
                  </Form>
               )}
            </Formik >
         </div >
         {/* } */}
      </>
   );
}

export default Booking