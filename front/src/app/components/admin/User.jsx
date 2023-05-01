// DIVERS
import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import "../../assets/styles/components/admin.css"

// REQUESTS
import { getRoles } from '../../api/backend/role';
import { updateUser } from '../../api/backend/user';

// REACT ICONS
import { FaTrashAlt } from 'react-icons/fa';



const User = ({ user: {firstName, lastName, email, address, addAdress, city, zipCode, country, phone, avatar, role, deleted, _id} }) => {
   const notifyRed = (notification) => toast.error(notification);
   const notify = (notification) => toast.success(notification);
   const token = useSelector((state) => (state.auth.token));
   const [allRoles, setAllRoles] = useState([]);


   const initialValues = {
      firstName,
      lastName,
      email,
      address,
      addAdress,
      city,
      zipCode,
      country,
      phone,
      role,
      deleted
   };


   useEffect(() => {
      getRoles()
         .then((result) => {
            setAllRoles(result.data);
         })
         .catch((err) => console.log(err));
   }, []);


   /******** fonction delete ********/
   const deleteFunction = () => {
      // TODO fonction de suppression
      console.log("deleted");
   }


   /******** Update the user ********/
   const updateItem = (values) => {
      // TODO modification de l'image
      console.log(token);
      updateUser(_id, values, token)
         .then((res) => {
            if (res.status === 200) {
               notify("Modification effectuée !");
            }
         })
         .catch((err) => {
            console.log(err);
            notifyRed("Modification échouée !");
         });
   }


   return (
      <div>
         <div className="flex items-center flex-shrink-0 h-16 px-8 ">
            <h1 className="text-center text-2xl mt-5">
               <span className="text-xl">user n°: </span>
               <span className="font-medium font-Starjedi tracking-wider text-2xl text-primary">{(_id)}</span>
            </h1>
         </div>

         <div className="flex-grow p-6 overflow-auto bg-zinc-800">
            <div className="bg-black mx-4 p-1 pb-8 mx-auto rounded-2xl mb-10">
               <Formik enableReinitialize initialValues={initialValues} onSubmit={(values) => updateItem(values)} className="border-2 p-1">
                  {({ values }) => (
                     <Form>

                        {/* AVATAR */}
                        <div className="bg-black opacity-85 flex my-5">
                           {avatar && (
                              <div className="mx-auto flex">
                                 <img src={avatar} alt={`avatar ${name}`} className="bg-black object-cover h-[300px] w-[300px" />
                              </div>
                           )}
                        </div>

                        {/* DETAIL */}
                        <div className="px-2 text-lg flex flex-col">
                           {/* IDENTITE */}
                           <fieldset className="mx-3 py-5">
                              <legend className="text-center px-3 text-2xl font-Starjedi text-primary">identite</legend>

                              <div className="grid grid-cols-12">
                                 <div className="col-span-2 text-right mr-2">
                                    <div className="text-terciary text-xl">Nom</div>
                                    <div className="text-terciary text-xl mt-8">Email</div>
                                 </div>

                                 <div className="col-span-4 grid-2">
                                    {/* LASTNAME, EMAIL */}
                                    <Field type="text" className="w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="lastName" value={values.lastName} />
                                    <Field type="text" className="mt-5 w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="email" value={values.email} />
                                 </div>

                                 <div className="col-span-2 text-right mr-2">
                                    <div className="text-terciary text-xl">Prénom</div>
                                    <div className="text-terciary text-xl mt-8">Role</div>
                                 </div>

                                 <div className="col-span-4 mr-5">
                                    {/* FIRSTNAME */}
                                    <Field id="firstName" type="text" className="w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="firstName" value={values.firstName} />

                                    {/* ROLE */}
                                    <Field as='select' id="role" name="role" className="w-full bg-[#202020] rounded-lg mt-5">
                                       {allRoles.map((item) => {
                                          return (
                                             <option key={item._id} value={item._id} selected={item._id === _id}>
                                                {item.name}
                                             </option>
                                          );
                                       })}
                                    </Field>
                                 </div>
                              </div>
                           </fieldset>

                           {/* ADRESS */}
                           <fieldset className="mx-3 py-5">
                              <legend className="text-center px-3 text-2xl font-Starjedi text-primary">adress</legend>

                              <div className="grid grid-cols-12">
                                 <div className="col-span-2 text-right mr-2">
                                    <div className="text-terciary text-xl">Adresse</div>
                                    <div className="text-terciary text-xl mt-8">Ville</div>
                                    <div className="text-terciary text-xl mt-8">Pays</div>
                                 </div>

                                 <div className="col-span-4 grid-2">
                                    {/* ADRESS, CITY, COUNTRY */}
                                    <Field id="address" type="text" className="w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="address" value={values.address} />
                                    <Field id="city" type="text" className="mt-5 w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="city" value={values.city} />
                                    <Field id="country" type="text" className="mt-5 w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="country" value={values.country} />
                                 </div>

                                 <div className="col-span-3 text-right mr-2">
                                    <div className="text-terciary text-xl">Compl.</div>
                                    <div className="text-terciary text-xl mt-8">Code Postal</div>
                                    <div className="text-terciary text-xl mt-8">Tel.</div>
                                 </div>

                                 <div className="col-span-3 mr-5">
                                    {/* ADD-ADRESS, ZIPCODE, PHONE */}
                                    <Field id="addAdress" type="text" className="w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="addAdress" value={values.addAdress} />
                                    <Field id="zipCode" type="text" className="mt-5 w-full h-10 whitePlaceholder rounded-lg bg-[#202020]" name="zipCode" value={values.zipCode} />
                                    <Field id="phone" type="text" className="w-full mt-5 h-10 whitePlaceholder rounded-lg bg-[#202020]" name="phone" value={values.phone} />
                                 </div>
                              </div>
                           </fieldset>

                           {/* CHECKBOX DELETED */}
                           <label className="inline-flex relative items-center mr-5 cursor-pointer ml-5 mt-4">
                              <Field type="checkbox" checked={values.deleted} className="sr-only peer" name="deleted" onClick={() => notifyRed("N'oubliez pas de valider votre choix !")}/>
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-focus:ring-zinc-700 bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-red-600 peer-checked:bg-red-600"></div>
                              <span className="ml-3 text-sm font-medium text-white">Deleted</span>
                           </label>
                        </div>

                        <button className="mx-auto w-4/12 text-center mt-6 pb-5 flex text-emerald-400 font-bold text-xl tracking-widest font-Starjedi hover:bg-emerald-400 hover:text-black border-2 border-zinc-700 rounded-xl border-dashed" type="submit">
                           <span className="mt-4 mx-auto">valider</span>
                        </button>
                     </Form>
                  )}
               </Formik>
            </div >
         </div >
      </div >
   )
}

export default User