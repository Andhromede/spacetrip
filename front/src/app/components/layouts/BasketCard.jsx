import { React, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import DateCalendar from "../../components/layouts/DateCalendar";
import { productsInBasket, addToBasket, removeToBasket, deleteToBasket, changePremiumInBasket } from '../../redux-store/basketSlice';
import { checkBookingDate, dateDiff } from "../../constants/functions";
import { getBookingByHousing } from "../../api/backend/booking";
// ICONE & STYLE
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from "react-toastify";

const BasketCard = ({ item }) => {
    // console.log(item);
    // const { id } = useParams();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const tabProducts = useSelector(productsInBasket);
    const [checked, setChecked] = useState(tabProducts.find((data) => data._id === item._id).premium);
    const dispatch = useDispatch();
    const notify = (notification) => toast.success(notification);
    const notifyRed = (notification) => toast.error(notification);




    /******** Change the premium current product ********/
    const handleChange = (item) => {
        dispatch(changePremiumInBasket(item));
        setChecked(!checked);
    };


    /******** Check the disponibility date ********/
    const checkDisponibility = (housing) => {

        if (selectedDate[0] && selectedDate[1]) {
            getBookingByHousing(housing._id)
                .then((bookingHousing) => {
                    let arrayBookingFree = [];
                    let selectedStartDate = new Date(selectedDate[0]);
                    let selectedEndDate = new Date(selectedDate[1]);

                    bookingHousing.data.map((data) => {
                        let startDateCalendar = new Date(data.startDate);
                        let endDateCalendar = new Date(data.endDate);
                        let resultDate = checkBookingDate(selectedStartDate, selectedEndDate, startDateCalendar, endDateCalendar);

                        if (!resultDate) {
                            arrayBookingFree.push(data);  // return a array of not free housing 
                        }  
                    })
                    let dureeSejour = dateDiff(selectedStartDate, selectedEndDate);

                    if (dureeSejour >= 6) {

                        if (arrayBookingFree.length > 0) {
                            notifyRed("Ces dates sont indisponibles");
                        }
                        if(arrayBookingFree.length <= 0) {
                            const cloneHousing = { ...housing };
                            cloneHousing.startDate = selectedStartDate;
                            cloneHousing.endDate = selectedEndDate;
                            dispatch(addToBasket(cloneHousing));
                            notify("Vos dates ont bien été modifiées !");
                        }
                    } else {
                        notifyRed("La durée du séjour minimale est de 7 jours");
                    }

                })
                .catch((err) => console.log(err));
        }
        else {
            notifyRed("Veuillez sélectionnez vos dates.");
        }
    };



    return (
        <>
            <div className="p-2 w-1/3 mx-auto bg-zinc-900 mb-10 rounded-lg">
                <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.picture[0].path} alt="image housing" />

                    <div className="px-3 text-justify">
                        {/* TITLES */}
                        <h2 className="mb-1 text-rose-300 text-2xl title-jedi text-center">{item.destination.name}</h2>
                        <h1 className="title-font text-lg text-white mb-4 font-bold">{item.name}</h1>

                        {/* DATES */}
                        <div className="mt-5 text-center mb-2" name="">
                            <span className="mt-5 text-white">Voyage du </span>
                            <span className="mt-5 text-purple font-bold"> {(new Date(item.startDate).toLocaleDateString())}</span>
                            <span className="mt-5 text-white"> au </span>
                            <span className="mt-5 text-purple font-bold"> {(new Date(item.endDate).toLocaleDateString())}</span>
                        </div>

                        <div>
                            <DateCalendar className="w-10/12" btnText="Verifier la disponibilité" open="true" submit={() => checkDisponibility(item)} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
                        </div>

                        {/* DESCRIPTION */}
                        <div className="leading-relaxed mb-3 text-gray-400 overflow-auto h-36 px-3 my-5">
                            {item.description}
                        </div>

                        {/* PRICE/PERS & REMOVE */}
                        <div className="flex items-center flex-wrap content-center">
                            <span className="font-bold text-white mr-4 inline-flex items-center leading-none text-sm pr-4 border-r-2 border-gray-300">
                                <button onClick={() => dispatch(removeToBasket(item))} id={item._id} name="btnRemove"><MdRemoveCircle className="text-terciary mr-2 text-2xl" /></button>

                                {(tabProducts.find(objects => objects._id === item._id)) &&
                                    <span>{tabProducts.find(objects => objects._id === item._id).quantity}.pers</span>
                                }

                                {(!tabProducts.find(objects => objects._id === item._id)) &&
                                    <span>0.pers</span>
                                }

                                <button onClick={() => dispatch(addToBasket(item))} id={item._id} name="btnAdd" ><MdAddCircle className="text-terciary ml-2 text-2xl" /></button>
                            </span>

                            <span className="font-bold text-white mr-4 leading-none text-sm pr-4 py-1 border-r-2 border-gray-300 h-[30px] flex items-center">
                                {(tabProducts.find(objects => objects._id === item._id)) &&
                                    <>
                                        {(item.totalPrice).toLocaleString()} €

                                        {item.destination.activity.length >0 && (
                                            <div className="flex items-center ml-4 text-center">
                                            <input id="premium" type="checkbox" checked={checked} onChange={() => handleChange(item)} className="w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="premium" className="ml-2 text-sm font-medium text-secondary-light dark:text-gray-300">Premium</label>
                                        </div>
                                        )}
                                    </>
                                }

                                {(!tabProducts.find(objects => objects._id === item._id)) &&
                                    <span>0 €</span>
                                }
                            </span>

                            <button onClick={() => dispatch(deleteToBasket(item))}><FaTrashAlt className="text-rose-500 text-lg" /></button>
                        </div>

                        {/* DETAIL */}
                        <div className="flex items-center flex-wrap font-bold mt-5">
                            <Link to={`/logement/${item._id}`} className="text-rose-300 inline-flex items-center md:mb-2 lg:mb-0">
                                <span className="pb-2">Détail</span>
                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasketCard;
