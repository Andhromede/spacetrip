// DIVERS
import { React } from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../../assets/styles/components/admin.css";

// REQUESTS
import { updateRole } from '../../api/backend/role';



const Role = ({ role: {name, deleted, _id} }) => {
   const notifyRed = (notification) => toast.error(notification);
   const notify = (notification) => toast.success(notification);
   const token = useSelector((state) => (state.auth.token));

   const initialValues = {
      name,
      deleted
   };


   /******** Update the role ********/
   const updateItem = (values) => {
      updateRole(_id, values, token)
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
            <h1 className="font-medium font-Starjedi tracking-wider text-3xl text-primary">Role</h1>
         </div>

         <div className="flex-grow p-6 overflow-auto bg-zinc-800">
            <div className="bg-black w-10/12 p-5 mx-auto rounded-2xl">
               <Formik enableReinitialize initialValues={initialValues} onSubmit={(values) => updateItem(values)} className="border-2 p-1" >
                  {({ values}) => (
                     <Form>
                        <div className="p-4 text-lg justify-between tracking-wider">
                           {/* NOM */}
                           <div className="flex grid grid-cols-12">
                              <label htmlFor="name" className="col-span-1 mr-2 text-terciary text-sm font-Varino">Nom</label>
                              <Field type="text" name="name" className="col-span-6 bg-[#202020] text-xl whitePlaceholder text-center border-none rounded-lg " id="name" value={values.name.toLowerCase()} />
                           </div>

                           {/* CHECKBOX DELETED */}
                           <label className="inline-flex relative items-center mr-5 cursor-pointer ml-5 mt-10">
                              <Field type="checkbox" className="sr-only peer" name="deleted" checked={values.deleted} onClick={() => notifyRed("N'oubliez pas de valider votre choix !")}/>
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-focus:ring-zinc-700 bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-red-600 peer-checked:bg-red-600"></div>
                              <span className="ml-3 text-sm font-medium text-white">Deleted</span>
                           </label>
                        </div>

                        <button  className="mx-auto w-4/12 text-center mt-6 pb-5 flex text-emerald-400 font-bold text-xl tracking-widest font-Starjedi hover:bg-emerald-400 hover:text-black border-2 border-zinc-700 rounded-xl border-dashed" type="submit">
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

export default Role