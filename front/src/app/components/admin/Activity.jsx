import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { destinations } from "../../api/backend/destination";
import { updateActivity } from "../../api/backend/activity";
import { FaTrashAlt } from 'react-icons/fa';
import "../../assets/styles/components/admin.css";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import FileInput from "../../components/layouts/FileInput";




const Activity = ({ activity: { deleted, description, destination, name, picture, _id } }) => {
   const token = useSelector((state) => state.auth.token);
   const notifyRed = (notification) => toast.error(notification);
   const notify = (notification) => toast.success(notification);
   const [allDestinations, setAllDestinations] = useState([]);

   const initialValues = {
      deleted,
      description,
      destination,
      name,
      picture
   };


   useEffect(() => {
      destinations()
         .then((result) => {
            setAllDestinations(result.data);
         })
         .catch((err) => console.log(err));
   }, []);


   /******** Delete the picture ********/
   const deleteFunction = () => {
      // TODO fonction de suppression
      console.log("deleted");
   }


   /******** Update the activity ********/
   const updateItem = (values) => {
      // console.log(values);

      if (values.picture !== picture) {
         if (values.picture.type === 'image/png' || values.picture.type === 'image/jpeg' || values.picture.type === 'image/jpg') {
            const data = new FormData();
            data.append("name", values.name);
            data.append("description", values.description);
            data.append("destination", JSON.stringify(values.destination))
            data.append("picture", values.picture);

            updateActivity(_id, data, token)
               .then((res) => {
                  if (res.status === 200) {
                     notify("Modification effectuée !");
                     console.log(res);
                  }
               })
               .catch((err) => {
                  notifyRed("Modification échouée !");
                  console.log(err)
               });
         }
         else {
            return notifyRed("Seul les images JPEG, JPG ou PNG sont acceptés !");
         }
      }
      else {
         updateActivity(_id, values, token)
            .then((res) => {
               if (res.status === 200) {
                  notify("Modification effectuée !");
               }
            })
            .catch((err) => {
               notifyRed("Modification échouée !");
               console.log(err)
            });
      }
   }


   return (
      <div className="pb-16">
         <Formik enableReinitialize initialValues={initialValues} key={booking._id} onSubmit={(values) => updateItem(values)} div className="border-2 p-1" id="housing">
            {({ values, setFieldValue }) => {
               return (
                  <Form>
                     <div className="flex-col flex items-center">
                        <Field type="text" name="name" className="mt-10 mx-auto tracking-wider text-3xl pinkplaceholder bg-[#202020] text-primary font-Starjedi mr-auto text-center border-none rounded-lg" id="name" value={(values.name.toLowerCase())} />
                        <div className="text-secondary font-bold mt-1 text-sm">( Id : {_id} )</div>
                     </div>

                     <div className="flex-grow p-4 overflow-auto bg-zinc-800">
                        <div className="bg-black w-11/12 p-1 pb-8 mx-auto rounded-2xl">

                           {/* SECTION IMAGE */}
                           {picture &&
                              <div className="flex mt-10 ml-5">
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

                                    {/* <FileInput/> */}

                                    <div className="flex items-center justify-center w-full mb-10">
                                       <label htmlFor="picture" className="flex flex-col items-center justify-center  h-26 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-700 bg-gray-800 border-gray-600 hover:border-gray-500">
                                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                             <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg%22%3E">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                             </svg>

                                             <div className="mb-2 text-sm text-gray-500 text-gray-400 text-center">
                                                <span className="font-semibold">Cliquez ici </span>
                                                <span> pour selectionner une image</span>
                                             </div>

                                             <div className="text-xs text-gray-500 text-gray-400">SVG, PNG, JPG or GIF</div>
                                          </div>

                                          <input id="picture" type="file" className="hidden" name="picture" value="" encType="multipart/form-data" accept="image/*"
                                             onChange={(event) => {
                                                console.log(event.target);
                                                setFieldValue("picture", event.target.files[0]);
                                             }} />
                                       </label>
                                    </div>

                                 </div>
                              </div>
                           }


                           {/* DESCRIPTION */}
                           <div className="mt-6 text-sm px-5">
                              <label htmlFor="" className="text-terciary text-sm font-Varino">Description</label>
                              <Field as="textarea" rows="6" name="description" className="whitePlaceholder rounded-lg bg-[#202020] mx-auto border-none w-full text-justify" id="description" value={values.description} />
                           </div>

                           <div className="flex mt-10 w-full mx-auto">
                              <div className="text-secondary-light mx-auto ml-5 w-full">
                                 <div className="text-secondary-light">

                                    {/* DESTINATIONS */}
                                    <div className="grid grid-cols-12 ">
                                       {allDestinations.map((destinationMapItem) => {
                                          return (
                                             <div className="col-span-3" key={destinationMapItem._id}>
                                                <Field
                                                   id={destinationMapItem._id}
                                                   value={destinationMapItem._id}
                                                   name="destination"
                                                   type="checkbox"
                                                   checked={values.destination.findIndex(object => object._id === destinationMapItem._id) >= 0}
                                                   // checked={Array.isArray(values.destination) ? values.destination.findIndex(object => object._id === destinationMapItem._id) >= 0 : destinationMapItem.destination._id === values.destination._id}
                                                   onChange={(evt) => {
                                                      const value = evt.target.value;
                                                      const index = values.destination.findIndex(object => object._id === value);

                                                      if (index === -1) {
                                                         const formikValues = [...values.destination];
                                                         formikValues.push(destinationMapItem);
                                                         // console.log(formikValues);
                                                         setFieldValue("destination", formikValues);
                                                      }
                                                      else {
                                                         const formikValues = [...values.destination];
                                                         formikValues.splice(index, 1);
                                                         // console.log(formikValues);
                                                         setFieldValue("destination", formikValues);
                                                      }
                                                   }}
                                                   className="text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 focus:ring-purple-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                                />

                                                <label htmlFor="destination" className="ml-2 text-xl font-medium text-secondary-light text-gray-300">
                                                   {destinationMapItem.name}
                                                </label>
                                             </div>
                                          );
                                       })}
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* DETAIL */}
                           <div className="p-4 text-lg justify-between tracking-wider justify-center grid grid-cols-12 mt-5">
                              <div className="flex col-span-12">

                                 {/* TODO les select réinitialisent les autres input */}

                                 {/* CHECKBOX DELETED */}
                                 <label className="inline-flex relative mr-5 cursor-pointer ml-5 mt-4">
                                    <Field type="checkbox" checked={values.deleted} className="sr-only peer" name="deleted" />
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
               )
            }}
         </Formik>
      </div>
   )
}

export default Activity