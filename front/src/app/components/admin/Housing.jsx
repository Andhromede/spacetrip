// DIVERS
import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import "../../assets/styles/components/admin.css";
import FileInput from "../../components/layouts/FileInput";

// FUNCTIONS
import { capitalize } from "../../constants/functions";

// REQUESTS
import { destinations } from "../../api/backend/destination";
import { putHousing } from "../../api/backend/housing";

// REACT ICONS
import { FaTrashAlt } from 'react-icons/fa';
import { BsFillPersonFill } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";



const Housing = ({ housing: { name, description, nbrPersons, nbBed1, nbBed2, price, deleted, picture, booking, destination, _id } }) => {
   const token = useSelector((state) => (state.auth.token));
   const notifyRed = (notification) => toast.error(notification);
   const notify = (notification) => toast.success(notification);
   const [allDestinations, setAllDestinations] = useState([]);

   const initialValues = {
      name,
      description,
      nbrPersons,
      nbBed1,
      nbBed2,
      price,
      deleted,
      picture,
      destination
   };

   useEffect(() => {
      destinations()
         .then((result) => {
            setAllDestinations(result.data);
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
      // TODO select destination : problème avec Mars, il faut d'abord changer la selection pour qu'elle soit prise en compte

      // if (values.picture) {
         if (values.picture.type === 'image/png' || values.picture.type === 'image/jpeg' || values.picture.type === 'image/jpg') {
            const data = new FormData();
            data.append("name", values.name);
            data.append("description", values.description);
            data.append("nbrPersons", values.nbrPersons);
            data.append("nbBed1", values.nbBed1);
            data.append("nbBed2", values.nbBed2);
            data.append("price", values.price);
            data.append("deleted", values.deleted);
            data.append("picture", values.picture);
            data.append("destination", JSON.stringify(values.destination));

            putHousing(_id, data, token)
               .then((res) => {
                  notify("Modification effectuée !");
               })
               .catch((err) => {
                  notifyRed("Modification échouée !");
               });
         }
         else {
            return notifyRed("Veuillez selectionner un format d'image valide (JPEG, JPG ou PNG).");
         }
      // }
      // else {
      //    putHousing(_id, values, token)
      //       .then((res) => {
      //          if (res.status === 200) {
      //             notify("Modification effectuée !")
      //          }
      //       })
      //       .catch((err) => {
      //          notifyRed("Modification échouée !");
      //       });
      // }
   }



   return (
      <div>
         <Formik enableReinitialize initialValues={initialValues} onSubmit={(values) => updateItem(values)} div className="border-2 p-1" id="housing">
            {({ values, errors, touched, setFieldValue }) => (
               <Form>
                  <div className="flex items-center flex-shrink-0 h-16 px-8 ">
                     <Field type="text" name="name" className="mt-10 mx-auto tracking-wider text-3xl pinkplaceholder bg-[#202020] text-primary font-Starjedi mr-auto text-center border-none rounded-lg" id="name" value={values.name} />
                  </div>

                  <div className="flex-grow p-6 overflow-auto bg-zinc-800 mt-5">
                     <div className="bg-black w-10/12 p-5 mx-auto rounded-2xl mb-20">

                        {/* SECTION ICONS */}
                        <fieldset>
                           <legend className="text-center text-2xl font-Starjedi text-primary px-3">infos</legend>

                           <div className="text-secondary-light mx-auto grid grid-cols-12 ml-20 mt-5 mb-6">

                              <div className="flex gap-1 justify-center text-lg col-span-4">
                                 <Field id="price" type="text" className="text-2xl whitePlaceholder rounded-lg bg-[#202020] mx-auto border-none w-full text-justify" name="price" value={values.price} />
                                 <span className="ml-1 mt-1 text-terciary "> € sem/pers. </span>
                              </div>

                              <div className="flex items-center text-xl col-span-8 grid grid-cols-12 ml-10">
                                 <div className="flex col-span-2 grid grid-cols-12">
                                    <BsFillPersonFill className="text-terciary text-xl mr-1 mt-1 col-span-3" />
                                    <Field id="nbrPersons" type="text" className="ml-2 col-span-9 text-2xl whitePlaceholder rounded-lg bg-[#202020] border-none w-full text-justify" name="nbrPersons" value={values.nbrPersons} />
                                 </div>

                                 <div className="flex col-span-3 grid grid-cols-12">
                                    <FaBed className="text-terciary text-xl ml-10 mr-1 mt-1 col-span-6" />
                                    <Field id="nbBed1" type="text" className="ml-3 col-span-6 text-2xl whitePlaceholder rounded-lg bg-[#202020] border-none w-full text-justify" name="nbBed1" value={values.nbBed1} />
                                 </div>

                                 <div className="flex col-span-3 grid grid-cols-12">
                                    <IoIosBed className="text-terciary text-xl ml-10 mr-1 mt-1 col-span-6" />
                                    <Field id="nbBed2" type="text" className="ml-3 col-span-6 text-2xl whitePlaceholder rounded-lg bg-[#202020] border-none w-full text-justify" name="nbBed2" value={values.nbBed2} />
                                 </div>
                              </div>
                           </div>
                        </fieldset>

                        {/* SECTION IMAGE */}
                        <div className="bg-black opacity-85 flex my-5">
                           <div className="mx-auto flex">
                              <div className="grid grid-cols-3 gap-4">
                                 {picture.map((img) => {
                                    return (
                                       <div className="flex grid mx-auto" key={img._id}>
                                          {/* IMAGE(S) */}
                                          <img src={img.path} alt="error" className="bg-black object-cover h-[200px] w-[200px]" />

                                          {/* BTN DELETE */}
                                          <div className="text-center text-red-500 font-bold hover:text-white" onClick={() => deleteFunction()}>
                                             <FaTrashAlt className="mx-auto my-2" />
                                          </div>
                                       </div>
                                    )
                                 })}

                                 {/* <FileInput /> */}
                                 <div className="border-2 flex border-dashed justify-center w-full rounded-lg border-gray-600 h-2/3 mt-6">
                                    <label htmlFor="picture" className="flex flex-col items-center justify-center h-26 rounded-lg cursor-pointer hover:bg-gray-700 bg-gray-800 border-gray-600">

                                       <div className="flex flex-col items-center">
                                          <svg aria-hidden="true" className="w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                          </svg>

                                          <div className="mb-2 text-sm text-gray-500 text-gray-400 text-center">
                                             <span className="font-semibold">Clickez ici </span>
                                             <span className=""> pour selectionner une image</span>
                                          </div>

                                          <div className="text-xs text-gray-500 text-gray-400">
                                             SVG, PNG, JPG or GIF
                                          </div>
                                       </div>

                                       <Field
                                          id="picture"
                                          className="hidden"
                                          type="file"
                                          name="picture"
                                          value=""
                                          encType="multipart/form-data"
                                          accept="image/*"
                                          onChange={(event) => { setFieldValue("picture", event.target.files[0]) }}
                                       />
                                    </label>
                                 </div>

                              </div>
                           </div>
                        </div>

                        {/* SELECT DESTINATION */}
                        <div className="flex ml-5 my-6">
                           <div className="text-terciary text-sm font-Varino mt-3 mr-3">
                              Destination
                           </div>

                           {allDestinations &&
                              <Field as='select' name="destination" className="bg-[#202020] rounded w-4/12" >
                                 {allDestinations.map((item) => {
                                    // console.log(allDestinations);
                                    return (
                                       <option key={item._id} value={item._id} selected={item._id === values.destination._id}>
                                          {`${capitalize(item.name)}`}
                                       </option>
                                    );
                                 })}
                              </Field>
                           }

                        </div>

                        {/* DETAIL */}
                        <div className="text-lg justify-between tracking-wider">
                           {/* DESCRIPTION */}
                           <div className="mt-4 text-sm px-5">
                              <label htmlFor="" className="text-terciary text-sm font-Varino">Description</label>
                              <Field as="textarea" rows="6" name="description" className="whitePlaceholder rounded-lg bg-[#202020] mx-auto border-none w-full text-justify" id="description" value={values.description} />
                           </div>

                           {/* CHECKBOX DELETED */}
                           <label className="inline-flex relative items-center mr-5 cursor-pointer ml-5 mt-4">
                              <Field type="checkbox" checked={values.deleted} className="sr-only peer" name="deleted" onClick={() => notifyRed("N'oubliez pas de valider votre choix !")} />
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-focus:ring-zinc-700 bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-red-600 peer-checked:bg-red-600"></div>
                              <span className="ml-3 text-sm font-medium text-white">Deleted</span>
                           </label>
                        </div>

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
      </div >
   )
}

export default Housing