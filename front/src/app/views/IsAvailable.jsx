import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DateCalendar from "../components/layouts/DateCalendar";
import { capitalize, checkBookingDate, dateDiff } from "../constants/functions";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogged } from "../redux-store/authenticationSlice";
import {
  addProductInBasket,
  productsInBasket,
  deleteToBasket,
} from "../redux-store/basketSlice";
// Requete API
import { getHousing } from "../api/backend/housing";
import { profilGet } from "../api/backend/profil";
import { getBookingByHousing } from "../api/backend/booking";
// Icones & style
import { ImLocation } from "react-icons/im";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiMessageAdd, BiMessageMinus } from "react-icons/bi";
import { Button } from "@material-tailwind/react";
import "../assets/styles/base/generalCss.css";
import { ToastContainer, toast } from "react-toastify";

export default function IsAvailable() {
  const { id } = useParams();
  const tabProducts = useSelector(productsInBasket);
  const [housing, setHousing] = useState({});
  const [product, setProduct] = useState({});
  const [dateValid, setDateValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userConnect, setUserConnect] = useState({});
  const [checked, setChecked] = useState(true);
  const activitiesPrice = 300;
  let [nbrPersons, setNbrPersons] = useState(1);
  let [totalPrice, setTotalPrice] = useState(0);
  const notify = (notification) => toast.success(notification);
  const notifyError = (notification) => toast.error(notification);

  let timeTravel = dateDiff(selectedDate[0], selectedDate[1]);
  let priceTravel = housing.price * timeTravel;

  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (id) {
      getHousing(id)
        .then((housing) => {
          setHousing(housing.data);
          let foundProduct = tabProducts.find(
            (product) => product._id === housing.data._id
          );
          setProduct(foundProduct);
          if (foundProduct) {
            setTotalPrice(foundProduct.totalPrice);
            setNbrPersons(foundProduct.quantity);
          }
        })
        .catch((err) => console.log(err));
    }
    if (isLogged) {
      profilGet(user.id, token)
        .then((userConnect) => {
          setUserConnect(userConnect.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleChange = () => {
    setChecked(!checked);
    if (product) {
      timeTravel = dateDiff(
        new Date(product.startDate),
        new Date(product.endDate)
      );
      priceTravel = housing.price * timeTravel;
      if (!checked) {
        setTotalPrice((priceTravel + activitiesPrice) * nbrPersons);
      } else {
        setTotalPrice(priceTravel * nbrPersons);
      }
    } else {
      if (!checked) {
        setTotalPrice((priceTravel + activitiesPrice) * nbrPersons);
      } else {
        setTotalPrice(priceTravel * nbrPersons);
      }
    }
  };

  const deleteProduct = (housing) => {
    dispatch(deleteToBasket(housing));
    notify("Voyage supprimé");
  };

  function calculTotalPrice() {
    if (checked) {
      setTotalPrice((priceTravel + activitiesPrice) * nbrPersons);
    } else {
      setTotalPrice(priceTravel * nbrPersons);
    }
  }

  const addToCart = (housing) => {
    let cloneProduct;
    if (dateValid || product) {
      if (product) {
        cloneProduct = { ...product };
        cloneProduct.quantity = nbrPersons;
        cloneProduct.premium = checked;
        cloneProduct.startDate = selectedDate[0]
          ? selectedDate[0]
          : product.startDate;
        cloneProduct.endDate = selectedDate[1]
          ? selectedDate[1]
          : product.endDate;
        cloneProduct.totalPrice = totalPrice;
        dispatch(addProductInBasket(cloneProduct));
        notify("Voyage modifié");
      } else {
        housing.quantity = nbrPersons;
        housing.premium = checked;
        housing.startDate = selectedDate[0];
        housing.endDate = selectedDate[1];
        housing.totalPrice = totalPrice;
        dispatch(addProductInBasket(housing));
        notify("Voyage ajouté à votre panier");
      }
    } else {
      notifyError("Selectionnez les dates de votre séjour");
    }
  };

  const checkDisponibility = () => {
    let arrayBookingFree = [];
    if (selectedDate[1] && nbrPersons > 0) {
      getBookingByHousing(id)
        .then((bookingsHousing) => {
          bookingsHousing.data.map((booking) => {
            let startDateCalendar = new Date(booking.startDate);
            let endDateCalendar = new Date(booking.endDate);
            let resultDate = checkBookingDate(
              selectedDate[0],
              selectedDate[1],
              startDateCalendar,
              endDateCalendar
            );
            if (!resultDate) {
              arrayBookingFree.push(booking);
            }
          });
          timeTravel = dateDiff(selectedDate[0], selectedDate[1]);
          if (timeTravel < 6) {
            notifyError("Sejour de 7 jours minimum");
          } else if (arrayBookingFree.length > 0) {
            notifyError("Logement indisponible à cette date");
          } else {
            calculTotalPrice();
            setDateValid(true);
            notify("Dates disponibles");
          }
        })
        .catch((err) => console.log(err));
    } else {
      notifyError("Selectionnez les dates de votre séjour");
    }
  };

  function removePerson() {
    if (nbrPersons > 1) {
      if (product) {
        timeTravel = dateDiff(
          new Date(product.startDate),
          new Date(product.endDate)
        );
        priceTravel = housing.price * timeTravel;
        if (checked) {
          setTotalPrice((priceTravel + activitiesPrice) * (nbrPersons - 1));
        } else {
          setTotalPrice(priceTravel * (nbrPersons - 1));
        }
      } else {
        if (checked) {
          setTotalPrice((priceTravel + activitiesPrice) * (nbrPersons - 1));
        } else {
          setTotalPrice(priceTravel * (nbrPersons - 1));
        }
      }
      setNbrPersons(nbrPersons - 1);
    }
  }

  function addPerson(maxPersons) {
    if (maxPersons > nbrPersons) {
      if (product) {
        timeTravel = dateDiff(
          new Date(product.startDate),
          new Date(product.endDate)
        );
        priceTravel = housing.price * timeTravel;
        if (checked) {
          setTotalPrice((priceTravel + activitiesPrice) * (nbrPersons + 1));
        } else {
          setTotalPrice(priceTravel * (nbrPersons + 1));
        }
      } else {
        if (checked) {
          setTotalPrice((priceTravel + activitiesPrice) * (nbrPersons + 1));
        } else {
          setTotalPrice(priceTravel * (nbrPersons + 1));
        }
      }
      setNbrPersons(nbrPersons + 1);
    }
  }

  return (
    <div className="gradiant-black md:fixed w-full h-full">
      <div>
        <ToastContainer autoClose={3500} theme="dark" position="bottom-right" />
      </div>
      {/* <section className="mx-auto"> */}
      <section className=" ">
        <h1 className="sr-only">Disponibilités</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2">
          <div className=" flex flex-col justify-center h-full py-auto text-center ">
            {product && (
              <div className="text-white my-6">
                <span>Voyage sélectionné du </span>
                <span className="text-purple font-bold">
                  {new Date(product.startDate).toLocaleDateString()}
                </span>
                <span> au </span>
                <span className="text-purple font-bold">
                  {new Date(product.endDate).toLocaleDateString()}
                </span>
              </div>
            )}
            <p className="text-white my-4"> Choisissez les dates de séjours</p>
            <small className="p-2 text-secondary">7 jours minimum</small>
            <div className="m-2">
              <DateCalendar
                open="true"
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                btnText="Vérifier la disponibilité"
                submit={checkDisponibility}
              />
            </div>
          </div>
          <div className=" md:py-24  ">
            <div className="  rounded-md mx-auto max-w-lg px-4 lg:px-8 ">
              <div className=" text-primary flex flex-row">
                <div className="h-20 w-20 rounded-full">
                  <img
                    className="h-full w-full border-4 rounded-full border-white-500 "
                    src={`.${userConnect.avatar}`}
                    alt={`avatar de ${userConnect.firstName}`}
                  />
                </div>
                {userConnect.firstName && (
                  <h2 className="pl-2 font-medium font-Varino text-lg my-auto">
                    {userConnect.firstName}
                  </h2>
                )}
              </div>

              {housing.destination && (
                <div>
                  <div className="mt-6 text-secondary-light ">
                    <div className="text-2xl font-medium tracking-tight">
                      {totalPrice
                        ? totalPrice.toLocaleString()
                        : (
                            (housing.price + activitiesPrice) *
                            nbrPersons
                          ).toLocaleString()}
                      €
                    </div>
                    <div className="mt-1 text-sm text-secondary">
                      Total pour cette réservation
                    </div>
                  </div>
                  <div className="mt-11">
                    <div className="text-secondary-light flex flex-wrap py-2  border-[1px] border-secondary p-2 rounded-md">
                      <div className="flex w-full h-full items-start">
                        {housing.picture && (
                          <div className="w-full">
                            <img
                              src={housing.picture[0].path}
                              alt={`image du logement ${housing.name}`}
                              className="bg-transparent h-full w-full object-contain object-center lg:h-full lg:w-full"
                            />
                          </div>
                        )}

                        <div className="ml-4">
                          <div className="text-xl flex font-Starjedi tracking-widest">
                            <Link to={`/logement/${housing._id}`}>
                              <strong>{housing.name}</strong>
                            </Link>
                            <button
                              className="flex justify-end w-full"
                              onClick={() => deleteProduct(housing)}
                            >
                              <FaTrashAlt className="text-red-500 text-sm hover:text-red-400" />
                            </button>
                          </div>

                          <div className=" flex text-md items-center">
                            <ImLocation className="text-terciary" />
                            <Link
                              to={`/destination/${housing.destination._id}`}
                            >
                              <span className="ml-2 font-Varino text-purple">
                                {capitalize(housing.destination.name)}
                              </span>
                            </Link>
                          </div>
                          <div className="text-sm mt-2 ">
                            {housing.price.toLocaleString()} €
                            <small className="pl-2 text-secondary">
                              / nuit
                            </small>
                          </div>
                          <small className=" text-secondary">
                            Transport compris
                          </small>
                          <div className="flex flex-wrap font-bold ">
                            <div className="font-bold text-white text-sm my-2 mt-2">
                              <button
                                className="self-center"
                                onClick={removePerson}
                              >
                                <BiMessageMinus className="text-terciary text-2xl " />
                              </button>
                              <span className="mx-2">
                                {nbrPersons ? nbrPersons : 0} .pers
                              </span>

                              {!product && (
                                <button
                                  onClick={() => addPerson(housing.nbrPersons)}
                                >
                                  <BiMessageAdd className="text-terciary text-2xl" />
                                </button>
                              )}

                              {product && (
                                <button
                                  onClick={() =>
                                    addPerson(housing.nbrPersons, product)
                                  }
                                >
                                  <BiMessageAdd className="text-terciary text-2xl" />
                                </button>
                              )}
                            </div>
                            {/* Activités premium */}
                            {console.log(housing.destination.activity)}
                            {housing.destination.activity.length > 0 && (
                              <div className="flex-row w-full grow text-sm">
                                <div className="flex items-center mt-2 text-center">
                                  <input
                                    id="activites"
                                    type="checkbox"
                                    checked={checked}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                  <label
                                    htmlFor="activites"
                                    className="ml-2 text-sm font-medium text-secondary-light dark:text-gray-300"
                                  >
                                    Activités
                                  </label>
                                </div>
                              </div>
                            )}
                            <Button
                              className="mx-auto mt-4 text-secondary-light hover:bg-gradient-to-tr from-[#9001DB] to-[#160045]"
                              variant="outlined"
                              onClick={() => addToCart(housing)}
                            >
                              <AiOutlineShoppingCart className="text-lg " />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
