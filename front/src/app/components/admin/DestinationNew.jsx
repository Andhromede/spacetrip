// DIVERS
import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import FileInput from "../../components/layouts/FileInput";
import "../../assets/styles/components/admin.css";
import DestinationSchema from "../../schema-yup/admin/newDestination-yup";

// REQUESTS
import { insertDestination } from "../../api/backend/destination";

// REACT ICONS
import { FaTrashAlt } from 'react-icons/fa';
// import Login from './../Auth0.jsx/LoginAuth0';



const Destination = () => {
   const token = useSelector((state) => (state.auth.token));
   const notifyRed = (notification) => toast.error(notification);
   const notify = (notification) => toast.success(notification);
   // const [image, setImage] = useState();

   let initialValues = {
      picture: "",
      name: "",
      slogan: "",
      description: ""
   };


   const deleteFunction = () => {
      // TODO fonction de suppression
      console.log("deleted");
   }


   /******** Create the planete ********/
   const createDestination = (values) => {
      if (values.picture) {
         if (values.picture.type === 'image/png' || values.picture.type === 'image/jpeg' || values.picture.type === 'image/jpg') {
            const data = new FormData();
            data.append("name", values.name);
            data.append("slogan", values.slogan);
            data.append("description", values.description);
            data.append("picture", values.picture);

            insertDestination(data, token)
               .then((res) => {
                  if (res.status === 200) {
                     notify("Insertion effectuée !");
                  }
               })
               .catch((err) => { notifyRed("Insertion échouée !"); });

         } else {
            return notifyRed("Seul les images JPEG, JPG ou PNG sont acceptés !");
         }

      } else {
         notifyRed("Veuillez séléctionner une image !");
      }
   }


   return (
      <div>
         <Formik
            enableReinitialize
            validationSchema={DestinationSchema}
            initialValues={initialValues}
            onSubmit={(values) => createDestination(values)}
            div
            className="border-2 p-1"
         >
            {({ values, errors, touched, setFieldValue }) => (
               <Form>
                  <div className="flex-col flex items-center mt-10 tracking-wider text-2xl text-primary font-Starjedi">
                     <Field
                        type="text"
                        name="name"
                        className={
                           errors.name && touched.name
                              ? "border-1 border-rose-600 mx-auto placeholder-terciary placeholder:text-sm bg-[#202020] text-center rounded-lg"
                              : "mx-auto placeholder-terciary placeholder:text-sm bg-[#202020] text-center rounded-lg border-1"
                        }
                        id="name"
                        value={values.name.toLowerCase()}
                        placeholder="Nom de la planète"
                     />
                     {errors.name && touched.name && (
                        <p className="error text-[#ff0000] font-serif text-sm mt-2">
                           {errors.name}
                        </p>
                     )}
                  </div>

                  <div className="flex-grow p-6 overflow-auto bg-zinc-800">
                     <div className="bg-black w-10/12 p-5 mx-auto rounded-2xl mb-10">
                        <div className="bg-black opacity-85 flex my-5">
                           <div className="mx-auto flex">
                              {/* IMAGE */}
                              <div className="my-auto ml-3 font-bold pt-5">
                                 <div className={
                                    errors.picture && touched.picture
                                       ? "border-2 border-rose-600 flex items-center border-dashed justify-center w-full rounded-lg"
                                       : "flex items-center justify-center w-full border-gray-600 border-dashed border-2 rounded-lg"
                                 }
                                 >
                                    <label htmlFor="picture" className="flex flex-col items-center justify-center h-26 rounded-lg cursor-pointer hover:bg-gray-700 bg-gray-800 border-gray-600 hover:border-gray-500">

                                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                          <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                          </svg>

                                          <div className="mb-2 text-sm text-gray-500 text-gray-400 text-center">
                                          <span className="font-semibold">Cliquez ici </span>
                                                <span> pour selectionner une image</span>
                                          </div>

                                          <div className="text-xs text-gray-500 text-gray-400">
                                             SVG, PNG, JPG or GIF
                                          </div>
                                       </div>

                                       <Field
                                          id="picture"
                                          type="file"
                                          className="hidden"
                                          name="picture"
                                          value=""
                                          encType="multipart/form-data"
                                          accept="image/*"
                                          onChange={(event) => {
                                             setFieldValue("picture", event.target.files[0]);
                                          }}
                                       />

                                       {errors.picture && touched.picture && (
                                          <p className="error text-[#ff0000] font-serif text-sm my-2 mx-auto p-2 text-center"> {errors.picture} </p>
                                       )}
                                    </label>
                                 </div>

                                 {/* BTN DELETE */}
                                 <div
                                    className="mt-6 pb-5 flex text-red-500 font-bold text-lg hover:bg-red-500 hover:text-black hover:rounded "
                                    onClick={() => deleteFunction()}
                                 >
                                    <FaTrashAlt className="mr-2 mt-1 ml-10 mt-5" />
                                    <span className="mt-4">Supprimer</span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <hr className="mx-auto w-9/12" />

                        {/* DETAIL */}
                        <div className="p-4 text-lg flex flex-col justify-between tracking-wider">
                           {/* SLOGAN */}
                           <div className="mt-4 text-sm px-5">
                              <label
                                 htmlFor=""
                                 className="text-terciary text-sm font-Varino"
                              >
                                 Slogan
                              </label>
                              <Field
                                 as="textarea"
                                 rows="3"
                                 name="slogan"
                                 className={
                                    errors.slogan && touched.slogan
                                       ? "border-1 border-rose-600 my-2 whitePlaceholder rounded-lg bg-[#202020] mx-auto w-full text-justify"
                                       : "border-1 whitePlaceholder rounded-lg bg-[#202020] mx-auto w-full text-justify"
                                 }
                                 id="slogan"
                                 value={values.slogan}
                              />
                              {errors.slogan && touched.slogan && (
                                 <p className="error text-[#ff0000] font-serif text-sm text-center">
                                    {errors.slogan}
                                 </p>
                              )}
                           </div>

                           {/* DESCRIPTION */}
                           <div className="mt-4 text-sm px-5">
                              <label htmlFor="" className="text-terciary text-sm font-Varino">
                                 Description
                              </label>
                              <Field
                                 as="textarea"
                                 rows="6"
                                 name="description"
                                 className={
                                    errors.description && touched.description
                                       ? "border-1 border-rose-600 my-2 whitePlaceholder rounded-lg bg-[#202020] mx-auto w-full text-justify"
                                       : "border-1 whitePlaceholder rounded-lg bg-[#202020] mx-auto w-full text-justify"
                                 }
                                 id="description"
                                 value={values.description}
                              />
                              {errors.description && touched.description && (
                                 <p className="error text-[#ff0000] font-serif text-sm text-center">
                                    {errors.description}
                                 </p>
                              )}
                           </div>
                        </div>

                        <button
                           className="mx-auto w-4/12 text-center mt-6 pb-5 flex text-emerald-400 font-bold text-xl tracking-widest font-Starjedi hover:bg-emerald-400 hover:text-black border-2 border-zinc-700 rounded-xl border-dashed"
                           type="submit"
                        >
                           <span className="mt-4 mx-auto">valider</span>
                        </button>
                     </div>
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default Destination;