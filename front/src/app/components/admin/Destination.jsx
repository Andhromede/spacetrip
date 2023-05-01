// DIVERS
import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import FileInput from "../../components/layouts/FileInput";
import "../../assets/styles/components/admin.css";

// REQUESTS
import { putDestination } from "../../api/backend/destination";

// REACT ICONS
import { FaTrashAlt } from 'react-icons/fa';



const Destination = ({ destination: { picture, name, slogan, description, deleted, _id } }) => {
    const token = useSelector((state) => (state.auth.token));
    const notifyRed = (notification) => toast.error(notification);
    const notify = (notification) => toast.success(notification);

    let initialValues = {
        picture,
        name,
        slogan,
        description,
        deleted
    };

    const deleteImg = () => {
        // TODO fonction de suppression
        console.log("deleted");
    }


    /******** Update the planete ********/
    const updateDestination = (values) => {
        if (values.picture && values.picture !== picture) {
            if (values.picture.type === 'image/png' || values.picture.type === 'image/jpeg' || values.picture.type === 'image/jpg') {
                const data = new FormData();
                data.append("name", values.name);
                data.append("slogan", values.slogan);
                data.append("description", values.description);
                data.append("deleted", values.deleted);
                data.append("picture", values.picture);

                putDestination(_id, data, token)
                    .then((res) => {
                        if (res.status === 200) {
                            notify("Modification effectuée !")
                        }
                    })
                    .catch((err) => {
                        notifyRed("Modification échouée !");
                    });
            }
            else {
                return notifyRed("Seul les images JPEG, JPG ou PNG sont acceptés !");
            }
        }
        else {
            putDestination(_id, values, token)
                .then((res) => {
                    if (res.status === 200) {
                        notify("Modification effectuée !")
                    }
                })
                .catch((err) => {
                    notifyRed("Modification échouée !");
                });
        }
    }


    return (
        <div>
            <Formik enableReinitialize initialValues={initialValues} onSubmit={(values) => updateDestination(values)} div className="border-2 p-1" >
                {({ values, setFieldValue }) => (
                    <Form>

                        <div className="flex-col flex items-center">
                            <Field type="text" name="name" className="mt-10 mx-auto tracking-wider text-3xl pinkplaceholder bg-[#202020] text-primary font-Starjedi mr-auto text-center border-none rounded-lg" id="name" value={(values.name.toLowerCase())} />
                            <div className="text-secondary font-bold mt-1 text-sm">( Id : {_id} )</div>
                        </div>

                        <div className="flex-grow p-6 overflow-auto bg-zinc-800">
                            <div className="bg-black w-10/12 p-5 mx-auto rounded-2xl mb-10">
                                <div className="bg-black opacity-85 flex my-5">
                                    {picture && (
                                        <div className="mx-auto flex">
                                            <img src={picture} alt={`image du logement ${name}`} className="bg-black object-cover h-[300px] w-[300px" />

                                            <div className="my-auto ml-3 font-bold pt-5">
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
                                                {/* <FileInput /> */}

                                                <div className="mt-6 pb-5 flex text-red-500 font-bold text-lg hover:bg-red-500 hover:text-black hover:rounded " onClick={() => deleteImg()}>
                                                    <FaTrashAlt className="mr-2 mt-1 ml-10 mt-5" />
                                                    <span className="mt-4">Supprimer</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <hr className="mx-auto w-9/12" />

                                <div className="p-4 text-lg flex flex-col justify-between tracking-wider">
                                    {/* SLOGAN */}
                                    <div className="mt-4 text-sm px-5">
                                        <label htmlFor="" className="text-terciary text-sm font-Varino">Slogan</label>
                                        <Field as="textarea" rows="3" name="slogan" className="whitePlaceholder rounded-lg bg-[#202020] mx-auto border-none w-full text-justify" id="slogan" value={values.slogan} />
                                    </div>

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

                                <button className="mx-auto w-4/12 text-center mt-6 pb-5 flex text-emerald-400 font-bold text-xl tracking-widest font-Starjedi hover:bg-emerald-400 hover:text-black border-2 border-zinc-700 rounded-xl border-dashed" type="submit">
                                    <span className="mt-4 mx-auto">valider</span>
                                </button>
                            </div >
                        </div >
                    </Form>
                )}
            </Formik>
        </div >
    );
};

export default Destination;