// DIVERS
import { React } from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../../assets/styles/components/admin.css";

// REQUESTS
import { insertRole } from '../../api/backend/role';



const RoleNew = () => {
    const notifyRed = (notification) => toast.error(notification);
    const notify = (notification) => toast.success(notification);
    const token = useSelector((state) => (state.auth.token));

    const initialValues = {
        name: "",
    };


    /******** Insert the role ********/
    const insertItem = (values) => {
        insertRole(values, token)
            .then((res) => {
                notify("Insertion effectuée !");
            })
            .catch((err) => { notifyRed("Insertion échouée !"); });
    }


    return (
        <div>
            <div className="flex items-center flex-shrink-0 h-16 px-8 ">
                <h1 className="font-medium font-Starjedi tracking-wider text-3xl text-primary">Role</h1>
            </div>

            <div className="flex-grow p-6 overflow-auto bg-zinc-800">
                <div className="bg-black w-10/12 p-5 mx-auto rounded-2xl">
                    <Formik enableReinitialize initialValues={initialValues} onSubmit={(values) => insertItem(values)} className="border-2 p-1" >
                        {({ values }) => (
                            <Form>
                                <div className="p-4 text-lg justify-between tracking-wider">
                                    {/* NOM */}
                                    <div className="flex grid grid-cols-12">
                                        <label htmlFor="name" className="col-span-1 mr-2 text-terciary text-sm font-Varino">Nom</label>
                                        <Field type="text" name="name" className="col-span-6 bg-[#202020] text-xl whitePlaceholder text-center border-none rounded-lg " id="name" value={values.name.toLowerCase()} />
                                    </div>
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

export default RoleNew