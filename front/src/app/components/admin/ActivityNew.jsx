// DIVERS
import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import "../../assets/styles/components/admin.css";
import FileInput from "../../components/layouts/FileInput";
import ActivitySchema from "../../schema-yup/admin/newActivity-yup";

// REQUESTS
import { destinations } from "../../api/backend/destination";
import { postActivity } from "../../api/backend/activity";



const NewActivity = () => {
   const notifyRed = (notification) => toast.error(notification);
   const notify = (notification) => toast.success(notification);
   const [allDestinations, setAllDestinations] = useState([]);
   const token = useSelector((state) => (state.auth.token));

   const initialValues = {
      name: "",
      description: "",
      destination: "",
      picture: ""
   };


   useEffect(() => {
      destinations()
         .then((result) => {
            setAllDestinations(result.data);
         })
         .catch((err) => console.log(err));
   }, []);


   /******** Create the activity ********/
   const createItem = (values) => {
      if (values.picture) {
         if (values.picture.type === 'image/png' || values.picture.type === 'image/jpeg' || values.picture.type === 'image/jpg') {
            const data = new FormData();
            data.append("name", values.name);
            data.append("description", values.description);
            data.append("destination", [values.destination]);
            data.append("picture", values.picture);

            postActivity(data, token)
               .then((res) => {
                  notify("Insertion effectuée !");
               })
               .catch((err) => {
                  notifyRed("Insertion échouée !");
                  console.log(err)
               });
         }
         else {
            return notifyRed("Seul les images JPEG, JPG ou PNG sont acceptés !");
         }
      }
      else {
         postActivity(values, token)
            .then((res) => {
               notify("Insertion effectuée !");
            })
            .catch((err) => {
               notifyRed("Insertion échouée !");
               console.log(err)
            });
      }
   }


   return (
      <div className="pb-16">
         <Formik enableReinitialize validationSchema={ActivitySchema} initialValues={initialValues} key="newActivity" onSubmit={(values) => createItem(values)} div className="border-2 p-1" id="housing">
            {({ values, errors, touched, setFieldValue }) => {
               return (
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
                           placeholder="Nom de l'activité"
                        />
                        {errors.name && touched.name && (
                           <p className="error text-[#ff0000] font-serif text-sm mt-2">
                              {errors.name}
                           </p>
                        )}
                     </div>

                     <div className="flex-grow p-4 overflow-auto bg-zinc-800">
                        <div className="bg-black w-11/12 p-1 pb-8 mx-auto rounded-2xl">
                           {/* SECTION IMAGE */}
                           <div className="flex mt-10 ml-5">
                              <div className="grid grid-cols-3 gap-4">

                                 {/* INPUT FILES */}
                                 <div className="border-2 flex items-center border-dashed justify-center w-full rounded-lg border-gray-600">
                                    <label htmlFor="picture" className="flex flex-col items-center justify-center h-26 rounded-lg cursor-pointer hover:bg-gray-700 bg-gray-800 border-gray-600">

                                       <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                                          <svg
                                             aria-hidden="true"
                                             className="w-10 h-10 mb-3 text-gray-400"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                             />
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

                           {/* DESCRIPTION */}
                           <div className="mt-6 text-sm px-4">
                              <label
                                 htmlFor=""
                                 className=" text-terciary text-sm font-Varino"
                              >
                                 Description
                              </label>
                              <Field
                                 as="textarea"
                                 rows="6"
                                 name="description"
                                 className={
                                    errors.description && touched.description
                                       ? "border-1 border-rose-600 my-2 whitePlaceholder rounded-lg bg-[#202020] mx-auto w-full text-justify"
                                       : "border-1 whitePlaceholder rounded-lg bg-[#202020] mx-auto  w-full text-justify"
                                 }
                                 id="description"
                                 value={values.description}
                              />
                              {errors.description && touched.description && (
                                 <p className="error text-[#ff0000] font-serif text-sm my-2 text-center">
                                    {errors.description}
                                 </p>
                              )}
                           </div>

                           <div className="flex mt-10 w-full mx-auto">
                              <div className="text-secondary-light mx-auto ml-5 w-full">
                                 <div className="text-secondary-light">
                                    {/* DESTINATIONS */}
                                    <div className="grid grid-cols-12 ">
                                       {allDestinations.map(
                                          (destinationMapItem) => {
                                             return (
                                                <div
                                                   className="col-span-3"
                                                   key={destinationMapItem._id}
                                                >
                                                   <Field
                                                      id={destinationMapItem._id}
                                                      value={destinationMapItem._id}
                                                      name="destination"
                                                      type="checkbox"
                                                      className="text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 focus:ring-purple-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                                   />

                                                   <label
                                                      htmlFor="destination"
                                                      className="ml-2 text-xl text-secondary-light text-gray-300"
                                                   >
                                                      {destinationMapItem.name}
                                                   </label>
                                                </div>
                                             );
                                          }
                                       )}
                                    </div>
                                    {errors.destination &&
                                       touched.destination && (
                                          <p className="error text-[#ff0000] font-serif text-sm my-2 text-center">
                                             {errors.destination}
                                          </p>
                                       )}
                                 </div>
                              </div>
                           </div>

                           {/* VALIDATION BTN */}
                           <div className="w-full flex">
                              <button
                                 className="mx-auto w-4/12 text-center mt-6 py-2 text-emerald-400 font-bold text-xl tracking-widest font-Starjedi hover:bg-emerald-400 hover:text-black border-2 border-zinc-700 rounded-xl border-dashed"
                                 type="submit"
                              >
                                 <span className="mt-4 mx-auto my-auto">
                                    valider
                                 </span>
                              </button>
                           </div>
                        </div>
                     </div>
                  </Form>
               );
            }}
         </Formik>
      </div>
   )
}

export default NewActivity