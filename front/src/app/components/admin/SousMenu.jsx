// DIVERS
import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux';

// REQUESTS
import { getActivity } from "../../api/backend/activity";
import { bookings } from "../../api/backend/booking";
import { destinations } from "../../api/backend/destination";
import { getAllHousings } from "../../api/backend/housing";
import { getRates } from "../../api/backend/rate";
import { getRoles } from "../../api/backend/role";
import { getUsers } from "../../api/backend/user";


const SousMenu = ({ model }) => {
    const [tabData, setTabData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);                   // selection du nom du menu principal ("housing", "user", "booking" ...)
    const user = useSelector((state) => (state.auth.user));
    const token = useSelector((state) => (state.auth.token));
    const [detailItemSelected, setDetailItemSelected] = useState([]);       // tableau des datas retournées pour le menu


    useEffect(() => {
        switch (model) {
            case 'activity':
                getActivity()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                        }
                    })
                    .catch((err) => console.log(err));
                break;

            case 'booking':
                bookings()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                        }
                    })
                    .catch((err) => console.log(err));
                break;

            case 'destination':
                destinations()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                        }
                    })
                    .catch((err) => console.log(err));
                break;

            case 'housing':
                getAllHousings()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                        }
                    })
                    .catch((err) => console.log(err));
                break;

            case 'rate':
                getRates()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                            console.log(res.data);
                        }
                    })
                    .catch((err) => console.log(err));
                break;

            case 'role':
                getRoles()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                        }
                    })
                    .catch((err) => console.log(err));
                break;

            default:
                getUsers(token)
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                        }
                    })
                    .catch((err) => console.log(err));
        }
    }, []);



    return (
        <div className="bg-black flex flex-col w-56 border-r border-gray-800 ml-40 fixed h-screen pb-[8rem]">
            {selectedData &&
                // <div className="flex flex-col flex-grow p-4 overflow-auto pb-[9rem]">
                <div className="flex flex-col flex-grow px-4 overflow-auto pt-5">
                    <div className="bg-indigo-800 hover:bg-purple-800 mb-5 flex items-center flex-shrink-0 h-10 px-3 text-sm font-medium rounded" >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="ml-2 leading-none">Ajouter</span>
                    </div>

                    {tabData &&
                        <>
                            {tabData.map((item) => {
                                return (
                                    <div key={item._id} className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded btn-admin" id={item._id} onClick={() => setDetailItemSelected(item)}>
                                        {(selectedData === "activity" || selectedData === "destination" || selectedData === "role") &&
                                            // <span className="leading-none" >{item.name}</span>
                                            <span className="leading-none" >{`${capitalize(item.name)}`}</span>
                                        }

                                        {(selectedData === "booking" || selectedData === "housing") &&
                                            // <span className="leading-none" onClick={() => fonctionBooking(item)}>{item.name}</span>
                                            <span className="leading-none flex my-auto" onClick={() => fonctionBooking(item)}>
                                                <span className="my-auto mr-1">{capitalize(item.name)}</span>
                                                <span className="my-auto text-gray-400">{`(${capitalize(item.destination.name)})`}</span>
                                            </span>
                                        }

                                        {(selectedData === "rate") &&
                                            <span className="leading-none flex my-auto" onClick={() => fonctionRate(item)}>
                                                <span className="my-auto mr-1">{capitalize(item.name)}</span>
                                                <span className="my-auto text-gray-400">{`(${capitalize(item.destination.name)})`}</span>

                                                {/* {item.name + " " + item.destination.name} */}

                                                {/* {detailItemSelected2.map((itemTest) => {
                                                            return (
                                                                itemTest._id == item.destination._id &&
                                                                <VscDebugBreakpointUnsupported className="text-red-600 text-3xl"/>
                                                            )
                                                        })} */}
                                            </span>
                                        }

                                        {selectedData === "user" &&
                                            <span className="leading-none">{item.email}</span>
                                        }
                                    </div>
                                );
                            })}

                        </>
                    }

                    <div className="my-5 bg-indigo-800 hover:bg-purple-800 flex items-center flex-shrink-0 h-10 px-3 text-sm font-medium rounded">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="ml-2 leading-none">Ajouter</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default SousMenu;