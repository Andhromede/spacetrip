// DIVERSsetChecked
import { React, useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import "../../assets/styles/components/admin.css";
import { useSelector } from "react-redux";


// REQUESTS
import { updateRate } from '../../api/backend/rate';



const Rate = ({ item: {deleted, isValable, _id, index, comment, title, rateDate, housing, user, rate}, isActive, setIsActive }) => {
   const notifyRed = (notification) => toast.error(notification);
   const notify = (notification) => toast.success(notification);
   const token = useSelector((state) => (state.auth.token));


   const initialValues = {
      deleted,
      isValable,
   };


   /******** Delete l'image ********/
   const deleteFunction = () => {
      // TODO fonction de suppression
      console.log("deleted");
   }


   /******** Update the Rate ********/
   const updateItem = (values) => {
      updateRate(_id, values, token)
         .then((res) => {
            if (res.status === 200) {
               // TODO la modification ne doit pas etre gerer par l'admin
               notify("Modification effectuée !");
            }
         })
         .catch((err) => {
            notifyRed("Modification échouée !");
         });
   }


   return (
      <>
         {rate &&
            <div className="pb-16 my-5">
               <div name="name" className="mx-auto tracking-wider text-2xl text-primary font-Starjedi text-center" id="name">{rate.name}</div>

               <Formik enableReinitialize initialValues={initialValues} key={booking._id} onSubmit={(values) => updateItem(values)} div className="border-2 p-1" id="housing">
                  {({ values }) => (
                     <Form>
                        <div className="flex-grow p-4 overflow-auto bg-zinc-800">
                           <div className={`bg-black w-11/12 p-1 pb-8 mx-auto rounded-2xl ${isActive === index ? "border-2 border-[#D200FF]" : ""}`} onClick={() => setIsActive(index)}>
                              {/* DETAIL */}
                              <div className="p-4 text-lg flex flex-col justify-between tracking-wider">

                                 <fieldset className="grid grid-cols-12 pr-5 pl-2 pb-5">
                                    <legend className={`text-center px-3 text-2xl font-Starjedi text-primary ${isActive === index ? "text-[#D200FF] font-bold" : "text-white"}`}>{_id}</legend>

                                    {/* TITLE */}
                                    <div className="flex mt-5 col-span-12 grid grid-cols-12">
                                       <label htmlFor="title" className="col-span-2 mr-2 text-terciary text-sm font-Varino text-right">Titre</label>
                                       <Field disabled type="text" name="title" className="col-span-10 pinkplaceholder bg-[#202020] text-xl whitePlaceholder text-center border-none rounded-lg" id="title" value={title} />
                                    </div>

                                    {/* COMMENT */}
                                    <div className="flex mt-5 col-span-12 grid grid-cols-12 text-left">
                                       <label htmlFor="" className="col-span-2 mr-2 text-terciary text-sm font-Varino text-right">Commentaire</label>
                                       <Field disabled as="textarea" rows="6" name="description" className="col-span-10 whitePlaceholder rounded-lg bg-[#202020] mx-auto border-none w-full text-justify" id="description" value={comment} />
                                    </div>

                                    {/* RATE */}
                                    <div className="flex mt-5 col-span-6 grid grid-cols-12">
                                       <label htmlFor="rate" className="col-span-4 mr-2 text-terciary text-sm font-Varino text-right">Note</label>
                                       <Field disabled type="text" name="rate" className="col-span-8 pinkplaceholder bg-[#202020] text-xl whitePlaceholder text-center border-none rounded-lg" id="rate" value={rate} />
                                    </div>

                                    {/* RATE DATE */}
                                    <div className="flex mt-5 col-span-6 grid grid-cols-12  mr-auto">
                                       <div className="col-span-4 mr-2 text-terciary text-sm font-Varino text-right">Date</div>
                                       <Field disabled id="rateDate" type="date" className="h-10 col-span-8 whitePlaceholder rounded-lg bg-[#202020] mx-auto" name="rateDate" value={new Date(rateDate).toISOString().slice(0, 10)} />
                                    </div>

                                    {/* HOUSING */}
                                    <div className="flex mt-5 col-span-6 grid grid-cols-12">
                                       <label htmlFor="housing" className="col-span-2 mr-2 text-terciary text-sm font-Varino">Housing</label>
                                       <Field disabled type="text" name="housing" className="col-span-9 pinkplaceholder bg-[#202020] text-xl whitePlaceholder text-center border-none rounded-lg" id="housing" value={housing.name} />
                                    </div>

                                    {/* USER */}
                                    <div className="flex mt-5 col-span-6 grid grid-cols-12">
                                       <label htmlFor="user" className="col-span-3 mr-2 text-terciary text-sm font-Varino">User</label>
                                       <input disabled type="text" name="user" className="col-span-9 pinkplaceholder bg-[#202020] text-xl whitePlaceholder text-center border-none rounded-lg" id={user} value={user? user.email : "Anonyme"} />
                                    </div>
                                 </fieldset>

                                 {/* CHECKBOX DELETED */}
                                 <div className="text-lg justify-between tracking-wider mt-5">
                                    <label className="inline-flex relative items-center mr-5 cursor-pointer ml-5 mt-4">
                                       <Field type="checkbox" checked={values.deleted} className="sr-only peer" name="deleted" onClick={() => notifyRed("N'oubliez pas de valider votre choix !")}/>
                                       <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-focus:ring-zinc-700 bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-red-600 peer-checked:bg-red-600"></div>
                                       <span className="ml-3 text-sm font-medium text-white">Deleted</span>
                                    </label>
                                 </div>

                                 {/* CHECKBOX IS VALABLE */}
                                 <div className="text-lg justify-between tracking-wider mt-5">
                                    <label className="inline-flex relative items-center mr-5 cursor-pointer ml-5 mt-4">
                                       <Field type="checkbox" checked={values.isValable} className="sr-only peer" name="isValable" onClick={() => notifyRed("N'oubliez pas de valider votre choix !")}/>
                                       <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-focus:ring-zinc-700 bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-red-600 peer-checked:bg-red-600"></div>
                                       <span className="ml-3 text-sm font-medium text-white">Validé</span>
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
               </Formik>
            </div>
         }
      </>
   );
}

export default Rate