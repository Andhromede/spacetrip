import { React, useState } from "react";
import { useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "../../assets/styles/components/admin.css";
import { capitalize } from "../../constants/functions";

// REQUESTS
import { getActivity } from "../../api/backend/activity";
import { getBookingByHousing } from "../../api/backend/booking";
import { destinations } from "../../api/backend/destination";
import { getAllHousings } from "../../api/backend/housing";
import { getRatesByHousing } from "../../api/backend/rate";
import { getUsers } from "../../api/backend/user";
import { getRoles } from "../../api/backend/role";

// COMPONENTS
import Destination from "../../components/admin/Destination";
import DestinationNew from "../../components/admin/DestinationNew";
import Housing from "../../components/admin/Housing";
import HousingNew from "../../components/admin/HousingNew";
import Booking from "../../components/admin/Booking";
import BookingNew from "../../components/admin/BookingNew";
import Activity from "../../components/admin/Activity";
import ActivityNew from "../../components/admin/ActivityNew";
import User from "../../components/admin/User";
import Role from "../../components/admin/Role";
import RoleNew from "../../components/admin/RoleNew";
import Rate from "../../components/admin/Rate";


const AdminHomeView = () => {
    const [tabData, setTabData] = useState([]);                             // tableau de données pour reponses des requests

    // MENU
    const [menuSelectedName, setMenuSelectedName] = useState([]);           // nom sélectionné dans le menu principal
    const [itemSelectedData, setItemSelectedData] = useState([]);           // tableau des datas pour le menu

    // SOUS MENU
    const [allitems, setAllitems] = useState([]);                           // tableau des datas pour le sous-menu

    // DIVERS
    const [isActive, setIsActive] = useState(false);                        // determine l'objet séléctionné dans les composants enfants
    const [isAjouter, setIsAjouter] = useState(false);                      // Active les ajouts
    const user = useSelector((state) => (state.auth.user));
    const token = useSelector((state) => (state.auth.token));
    const id = user?.id;


    /*********** GET BOOKINGS BY HOUSING  ***********/
    function fonctionBooking(itemBooking) {
        getBookingByHousing(itemBooking._id)
            .then((res) => {
                if (res.status === 200) {
                    setAllitems(res.data);
                }
            })
            .catch((err) => console.log(err));
    }


    /*********** GET ALL RATES BY HOUSING  ***********/
    function fonctionRate(itemRate) {
        getRatesByHousing(itemRate._id)
            .then((res) => {
                if (res.status === 200) {
                    setAllitems(res.data);
                }
            })
            .catch((err) => console.log(err));
    }


    /*********** REQUESTS ACCORDING BY NAME SELECTED IN THE MENU  ***********/
    function selectItem(itemSelectedName) {

        switch (itemSelectedName) {
            case 'activity':
                getActivity()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                            setItemSelectedData("");
                            setIsAjouter(false);
                        }
                    }).catch((err) => console.log(err));
                break;

            case 'booking':
                getAllHousings()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                            setIsAjouter(false);
                        }
                    }).catch((err) => console.log(err));
                break;

            case 'destination':
                destinations()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                            setItemSelectedData("");
                            setIsAjouter(false);
                        }
                    }).catch((err) => console.log(err));
                break;

            case 'housing':
                getAllHousings()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                            setIsAjouter(false);
                        }
                    }).catch((err) => console.log(err));
                break;

            // TODO gerer les commentaires sous forme de tableau
            case 'rate':
                getAllHousings()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                            setIsAjouter(false);
                        }
                    }).catch((err) => console.log(err));
                break;

            case 'role':
                getRoles()
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                            setIsAjouter(false);
                        }
                    }).catch((err) => console.log(err));
                break;

            case 'user':
                getUsers(token)
                    .then((res) => {
                        if (res.status === 200) {
                            setTabData(res.data);
                            setIsAjouter(false);
                        }
                    }).catch((err) => console.log(err));
                break;

            default:
                break;
        }
    }



    return (
        <>
            {/* MENU DE GAUCHE */}
            <div className="flex h-full text-gray-200 pt-[4rem]">
                <div className="bg-menu flex flex-col items-left pb-4 overflow-auto border-r border-gray-800 text-gray-200 px-4 fixed h-screen">
                    <div className="flex items-center justify-left flex-shrink-0 w-full h-16" >
                        <svg className="w-8 h-8 stroke-current text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="ml-1">Accueil</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex items-left justify-left flex-shrink-0 h-10 mt-4 rounded hover:bg-black hover:bg-opacity-50">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <span className="ml-1" id="destination" name="destination" onClick={(e) => { selectItem(e.target.id), setMenuSelectedName(e.target.id), setItemSelectedData("") }}>Planètes</span>
                    </div>

                    <div className="flex items-left justify-left flex-shrink-0 h-10 mt-4 rounded hover:bg-black hover:bg-opacity-50" >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="ml-1" id="activity" name="activity" onClick={(e) => { selectItem(e.target.id), setMenuSelectedName(e.target.id), setItemSelectedData("") }}>Activités</span>
                    </div>

                    <div className="flex items-left justify-left flex-shrink-0 h-10 mt-4 rounded hover:bg-black hover:bg-opacity-50" >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="ml-1" id="housing" name="housing" onClick={(e) => { selectItem(e.target.id), setMenuSelectedName(e.target.id), setItemSelectedData("") }}>Logements</span>
                    </div>

                    <div className="flex items-left justify-left flex-shrink-0 h-10 mt-4 rounded hover:bg-black hover:bg-opacity-50" >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="ml-1" id="booking" name="booking" onClick={(e) => { selectItem(e.target.id), setMenuSelectedName(e.target.id), setItemSelectedData("") }}>Réservations</span>
                    </div>

                    <div className="flex items-left justify-left flex-shrink-0 h-10 mt-4 rounded hover:bg-black hover:bg-opacity-50" >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span className="ml-1" id="rate" name="rate" onClick={(e) => { selectItem(e.target.id), setMenuSelectedName(e.target.id), setItemSelectedData("") }}>Commentaires</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex items-left justify-left flex-shrink-0 h-10 mt-4 rounded hover:bg-black hover:bg-opacity-50" >
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="ml-1" id="user" name="user" onClick={(e) => { selectItem(e.target.id), setMenuSelectedName(e.target.id), setItemSelectedData("") }}>Utilisateurs</span>
                    </div>

                    <div className="flex items-left justify-left flex-shrink-0 h-10 mt-4 rounded hover:bg-black hover:bg-opacity-50" id="role" name="role">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="ml-1" id="role" name="role" onClick={(e) => { selectItem(e.target.id), setMenuSelectedName(e.target.id), setItemSelectedData("") }}>Roles</span>
                    </div>
                </div>


                {/* SOUS-MENU DE GAUCHE */}
                <div className="bg-black flex flex-col w-56 border-r border-gray-800 ml-40 fixed h-screen pb-[8rem]">
                    {menuSelectedName &&
                        <div className="flex flex-col flex-grow px-4 overflow-auto pt-5">
                            {(menuSelectedName === "destination" || menuSelectedName === "activity" || menuSelectedName === "housing" || menuSelectedName === "role") &&
                                <div className="bg-indigo-800 hover:bg-purple-800 mb-5 flex items-center flex-shrink-0 h-10 px-3 text-sm font-medium rounded" >
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="ml-2 leading-none" name="ajouter" onClick={() => setIsAjouter(!isAjouter)}>Ajouter</span>
                                </div>
                            }

                            {tabData &&
                                <>
                                    {tabData.map((item) => {
                                        return (
                                            // <div className="flex flex-box grid grid-cols-5">
                                            <div key={item._id}>
                                                <div key={item._id} className="col-span-4 flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded btn-admin" id={item._id} onClick={() => setItemSelectedData(item)}>
                                                    {(menuSelectedName === "activity" || menuSelectedName === "destination" || menuSelectedName === "role") &&
                                                        // <span className="leading-none" >{item.name}</span>
                                                        <span className="leading-none" onClick={() => setIsAjouter(false)}>{`${capitalize(item.name)}`}</span>
                                                    }

                                                    {(menuSelectedName === "booking" || menuSelectedName === "housing") &&
                                                        <span className="leading-none flex my-auto" onClick={() => { fonctionBooking(item), setIsAjouter(false) }}>
                                                            <span className="my-auto mr-1">{capitalize(item.name)}</span>
                                                            <span className="my-auto text-gray-400">{`(${capitalize(item.destination.name)})`}</span>
                                                        </span>
                                                    }

                                                    {(menuSelectedName === "rate") &&
                                                        <span className="leading-none flex my-auto" onClick={() => { fonctionRate(item), setIsAjouter(false) }}>
                                                            <span className="my-auto mr-1">{capitalize(item.name)}</span>
                                                            <span className="my-auto text-gray-400">{`(${capitalize(item.destination.name)})`}</span>
                                                        </span>
                                                    }

                                                    {menuSelectedName === "user" &&
                                                        <span className="leading-none">{item.email}</span>
                                                    }
                                                </div>

                                                {/* <div className="col-span-1 text-gray-100 flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded btn-admin">sup</div> */}
                                            </div>
                                        );
                                    })}

                                </>
                            }

                            {(menuSelectedName === "destination" || menuSelectedName === "activity" || menuSelectedName === "housing" || menuSelectedName === "role") &&
                                <div className="bg-indigo-800 hover:bg-purple-800 mb-5 flex items-center flex-shrink-0 h-10 px-3 text-sm font-medium rounded" >
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="ml-2 leading-none" name="ajouter" onClick={() => setIsAjouter(!isAjouter)}>Ajouter</span>
                                </div>
                            }
                        </div>
                    }
                </div>


                {/* COMPOSANT PRINCIPAL (CENTRAL) */}
                <div className="flex flex-col flex-grow ml-[24rem] bg-zinc-800 h-full overflow-auto">

                    {/* PLANETES */}
                    {(menuSelectedName == "destination" && itemSelectedData && isAjouter === false) &&
                        <Destination destination={itemSelectedData} />
                    }

                    {(menuSelectedName == "destination" && isAjouter === true) &&
                        <DestinationNew />
                    }

                    {/* ACTIVITES */}
                    {(menuSelectedName == "activity" && itemSelectedData && isAjouter === false) &&
                        <Activity activity={itemSelectedData} />
                    }

                    {(menuSelectedName == "activity" && isAjouter === true) &&
                        <ActivityNew />
                    }

                    {/* LOGEMENTS */}
                    {(menuSelectedName == "housing" && itemSelectedData && isAjouter === false) &&
                        <Housing housing={itemSelectedData} />
                    }

                    {(menuSelectedName == "housing" && isAjouter === true) &&
                        <HousingNew />
                    }

                    {/* RESERVATIONS */}
                    {menuSelectedName === "booking" &&
                        <>
                            <div className="mx-auto mt-5 mb-10 underline">
                                <span className="text-3xl text-primary font-bold text-center">{allitems.length}</span>
                                <span className="text-3xl text-center font-bold"> reservation(s) trouvés pour le logement </span>
                                <span className="text-3xl text-primary font-bold text-center">{itemSelectedData.name}</span>
                                <span className="text-3xl text-center">.</span>
                            </div>

                            {allitems &&
                                allitems.map((item, index) => {
                                    return (
                                        (menuSelectedName == "booking" && allitems) &&
                                        <Booking booking={item} key={item._id} isActive={isActive} setIsActive={setIsActive} index={index} />
                                    )
                                })
                            }
                        </>
                    }

                    {(menuSelectedName === "booking" && isAjouter === true) &&
                        <BookingNew />
                    }

                    {/* COMMENTAIRES */}
                    {menuSelectedName === "rate" &&
                        <>
                            <div className="mx-auto mt-5 mb-10 underline">
                                <span className="text-3xl text-primary font-bold text-center">{allitems.length}</span>
                                <span className="text-3xl text-center font-bold"> commentaire(s) trouvés pour le logement </span>
                                <span className="text-3xl text-primary font-bold text-center">{itemSelectedData.name}</span>
                                <span className="text-3xl text-center">.</span>
                            </div>

                            {allitems &&
                                allitems.map((item, index) => {
                                    return (
                                        (menuSelectedName == "rate" && allitems) &&
                                        <Rate item={item} key={item._id} isActive={isActive} setIsActive={setIsActive} index={index} />
                                    )
                                })
                            }
                        </>
                    }

                    {/* USERS */}
                    {(menuSelectedName == "user" && itemSelectedData) &&
                        <User user={itemSelectedData} />
                    }

                    {/* ROLES */}
                    {(menuSelectedName == "role" && itemSelectedData && isAjouter === false) &&
                        <Role role={itemSelectedData} />
                    }

                    {(menuSelectedName === "role" && isAjouter === true) &&
                        <RoleNew />
                    }

                </div>
                <ToastContainer theme="dark" position="bottom-right" />
            </div>
        </>
    );
};

export default AdminHomeView;
