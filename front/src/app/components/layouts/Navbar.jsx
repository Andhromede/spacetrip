import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  URL_ABOUT_US,
  URL_HOME,
  URL_LOGIN,
  URL_REGISTER,
  URL_DESTINATIONS,
  URL_PROFIL,
  URL_PANIER,
  URL_BOOKING,
  URL_FILTER,
  URL_ADMIN_HOME,
} from "../../constants/urls/urlFrontEnd";
import { destinations } from "./../../api/backend/destination";
import { profilGet } from "./../../api/backend/profil";
import { selectIsLogged, signOut } from "../../redux-store/authenticationSlice";
import {
  productsInBasket,
  deleteAllToBasket,
} from "../../redux-store/basketSlice";
import LogoSpaceTrip from "../../assets/images/general/logo2.png";
import {
  BsSearch,
  BsBasket,
  BsXLg,
  BsFillPersonFill,
  BsFillCalendar2CheckFill,
} from "react-icons/bs";
import { HiLogout, HiOutlineMenu } from "react-icons/Hi";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const tabProducts = useSelector(productsInBasket);
  const [tabDestinations, setTabDestinations] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const id = user?.id;

  /********** RECHERCHE DES PLANETES **********/
  useEffect(() => {
    destinations()
      .then((res) => {
        if (res.status === 200) {
          setTabDestinations(res.data);
        }
      })
      .catch((err) => console.log(err));

    if (isLogged) {
      profilGet(id, token)
        .then((result) => {
          if (result.status === 200) {
            setCurrentUser(result.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  /********** DÉCONNEXION **********/
  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(deleteAllToBasket());
  };

  /********** FONCTIONS AFFICHAGE DROPDOWN **********/
  const showElement = (evt) => {
    let dropDownPlanete = document.querySelector('[name="dropdownPlanetes"]');
    let dropDownAccount = document.querySelector('[name="dropdownAccount"]');

    if (evt.target.id == "monCompte") {
      dropDownAccount.classList.remove("hidden");
    }
    if (evt.target.id == "destinations") {
      dropDownPlanete.classList.remove("hidden");
    }
  };

  /********** FONCTIONS DISPARITION DROPDOWN **********/
  const hiddeElement = () => {
    document.querySelector('[name="dropdownPlanetes"]').classList.add("hidden");
    if (isLogged) {
      document
        .querySelector('[name="dropdownAccount"]')
        .classList.add("hidden");
    }
  };

  return (
    <nav className="px-2 opacity-90 font-Varino bg-zinc-900 fixed top-0 z-50 w-full shadow-md">
      <div className=" flex items-center justify-between md:justify-start">
        {/* MENU MOBILE */}
        <div>
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsNavOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-md p-2 hover:text-white "
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <HiOutlineMenu className="text-2xl text-orange"/>
            </button>
          </div>
          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div onClick={() => setIsNavOpen(false)}>
            <div
              className="text-sm flex flex-col justify-start items-start w-full "
              
            >
              <div
                className="font-serif absolute top-0 right-0 px-8 py-8 text-terciary-light"
                onClick={() => setIsNavOpen(false)}
              >
                <BsXLg />
              </div>
              {!isLogged && (
                <>
                  <div className="flex gap-3">
                    {tabProducts.length > 0 && (
                      <span className="mr-1 text-white bg-rose-600 font-mono font-bolder text-sm border-2 border-rose-600 rounded-full py-[-2px] px-[3px] flex items-center h-[17px]">
                        {tabProducts.length}
                      </span>
                    )}
                    <Link to={URL_PANIER}>
                      <BsBasket className="text-2xl " />
                    </Link>
                  </div>
                  <Link to={URL_LOGIN}>Connexion</Link>
                  <Link to={URL_REGISTER}>Inscription</Link>
                </>
              )}
            </div>
            {isLogged && (
              <div className="flex justify-around w-full border-b-2 border-secondary-light w-full mb-16 p-4">
                <div className="flex">
                  {tabProducts.length > 0 && (
                    <span className="mr-1 text-white bg-rose-600 font-mono font-bolder text-sm border-2 border-rose-600 rounded-full py-[-2px] px-[3px] flex items-center h-[17px]">
                      {tabProducts.length}
                    </span>
                  )}
                  <Link to={URL_PANIER}>
                    <BsBasket className="text-3xl text-terciary" />
                  </Link>
                </div>
                <Link to={URL_PROFIL}>
                  <BsFillPersonFill className="text-terciary text-3xl" />
                </Link>
                <Link to={URL_BOOKING}>
                  <BsFillCalendar2CheckFill className="text-terciary text-3xl" />
                </Link>
                <Link onClick={handleSignOut} to={URL_HOME}>
                  <HiLogout className="text-red-400 text-3xl" />
                </Link>
              </div>
            )}
            <div className="flex items-center flex-col mb-24">
              <Link to={URL_DESTINATIONS} className="py-2">
                Nos destinations
              </Link>
              <Link to={URL_HOME} className="py-2 text-center">
                Offres Promotionnelles
              </Link>
              <Link to={URL_ABOUT_US} className="py-2">
                Qui sommes nous ?
              </Link>
              <Link to={URL_FILTER} className="py-2">
                Filtres de recherche
                {/* <BsSearch className="text-xl" /> */}
              </Link>
            </div>
          </div>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start ">
          <div className="flex flex-shrink-0 items-center">
            {/***** LOGO *****/}
            <Link to={URL_HOME}>
              <img
                className="h-16 cursor-pointer"
                src={LogoSpaceTrip}
                alt="logo spaceTrip"
              />
            </Link>
          </div>

          <div className="hidden sm:ml-6 md:block">
            <div className="flex md:space-x-4 lg:space-x-8 items-center">
              {/***** NOS DESTINATIONS *****/}
              <div
                className="md:flex-row hidden w-full md:block md:w-auto p-4"
                onMouseLeave={hiddeElement}
              >
                <div className=" ">
                  <div onMouseOver={showElement}>
                    <button
                      onClick={() => navigate(URL_DESTINATIONS)}
                      id="destinations"
                      data-dropdown-toggle="dropdownPlanetes"
                      className=" text-sm flex items-center py-2 text-white hover:text-rose-300"
                      // className=" text-sm flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-300 md:p-0 md:w-auto hover:text-white focus:text-white border-gray-700 hover:bg-gray-700 md:hover:bg-transparent"
                    >
                      Nos destinations
                      <IoIosArrowDown className="ml-1 text-md" />
                    </button>

                    <div
                      x-show="open"
                      name="dropdownPlanetes"
                      id="dropdownPlanetes"
                      className="hidden absolute "
                    >
                      <div className="bg-zinc-900 z-10 ">
                        <div
                          className="py-1 text-white text-sm"
                          aria-labelledby="destinations"
                        >
                          {tabDestinations &&
                            tabDestinations.map((item) => {
                              return (
                                // <div key={item._id}> <Link to={`/destination/${item._id}`} className="block py-2 px-4 hover:bg-rose-300 hover:text-black">{item.name}</Link> </div>
                                <div key={item._id}>
                                  <a
                                    href={`/destination/${item._id}`}
                                    className="block py-2 px-4 hover:bg-rose-300 hover:text-black"
                                  >
                                    {item.name}
                                  </a>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/***** OFFRES PROMOTIONNELLES  *****/}
              <div>
                <Link
                  to={URL_HOME}
                  className=" text-sm flex items-center py-2 text-white hover:text-rose-300"
                  // className="text-sm flex justify-between py-2 pr-4 pl-3 w-full font-medium text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-300 md:p-0 md:w-auto hover:text-white focus:text-white border-gray-700 hover:bg-gray-700 md:hover:bg-transparent"
                >
                  Offres Promotionnelles
                </Link>
              </div>

              {/***** QUI SOMMES NOUS ?  *****/}
              <div>
                <Link
                  to={URL_ABOUT_US}
                  className=" text-sm flex items-center py-2 text-white hover:text-rose-300"
                  // className="text-sm flex justify-between py-2 font-medium text-white rounded  md:border-0 md:hover:text-rose-300 md:p-0 md:w-auto "
                >
                  Qui sommes nous ?
                </Link>
              </div>

              {/***** ADMINISTRATION  *****/}
              {isLogged && user.role == import.meta.env.VITE_APP_ROLE_ADMIN && (
                <div>
                  <Link
                    to={URL_ADMIN_HOME}
                    className=" text-sm flex items-center py-2 text-white hover:text-rose-300"
                  >
                    Administration
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-x-2">
          {/***** FILTRES DE RECHERCHE *****/}
          <div className="md:flex-row hidden w-full md:block md:w-auto px-3 ">
              <Link
                to={URL_FILTER}
                className="text-sm  text-white md:hover:text-rose-300"
              >
                <BsSearch className="text-2xl" />
              </Link>
          </div>

          {/***** MON PANIER  *****/}
          <div className="hidden md:flex md:w-auto mr-1 ">
            {tabProducts.length > 0 && (
              <span className="mr-1 text-white bg-rose-600 font-mono font-bolder text-sm border-2 border-rose-600 rounded-full py-[-2px] px-[3px] flex items-center h-[17px]">
                {tabProducts.length}
              </span>
            )}

            <Link
              to={URL_PANIER}
              className="text-sm  text-white md:hover:text-rose-300"
            >
              <BsBasket className="text-2xl" />
            </Link>
          </div>

          {/***** CONNEXION / INSCRIPTION  *****/}
          <div className=" flex flex-wrap justify-between items-center mx-auto ">
            {!isLogged && isNavOpen === false && (
              <>
                <Link
                  to={URL_LOGIN}
                  className="text-sm w-full text-white md:hover:text-rose-300 w-auto mx-2"
                >
                  Connexion
                </Link>
                <Link
                  to={URL_REGISTER}
                  className="text-sm w-full text-white md:hover:text-rose-300 w-auto mx-2"
                >
                  Inscription
                </Link>
              </>
            )}

            {/***** DROPDOWN ACCOUNT  *****/}
            {isLogged && (
              <div
                onMouseLeave={hiddeElement}
                className="hidden md:block w-full "
              >
                <div>
                  <div className="text-sm md:text-md flex">
                    {currentUser && currentUser.firstName && (
                      <button
                        onMouseOver={showElement}
                        id="monCompte"
                        data-dropdown-toggle="dropdownAccount"
                        className="text-white hover:text-rose-300 flex items-center"
                      >
                        {currentUser.firstName}
                        <IoIosArrowDown className="ml-1 " />
                      </button>
                    )}

                    {(!currentUser || !currentUser.firstName) && (
                      <button
                        onMouseOver={showElement}
                        id="monCompte"
                        data-dropdown-toggle="dropdownAccount"
                        className="text-white hover:text-rose-300 flex items-center"
                      >
                        Mon compte
                        <IoIosArrowDown className="ml-1" />
                      </button>
                    )}

                    <div x-show="open" className="absolute origin-top-right">
                      <div
                        name="dropdownAccount"
                        id="dropdownAccount"
                        className="bg-zinc-900 hidden z-10 mt-10"
                      >
                        <div
                          className=" text-sm text-white"
                          aria-labelledby="monCompte"
                        >
                          <Link
                            to={URL_PROFIL}
                            className=" block py-2 px-2 hover:bg-rose-300 hover:text-black"
                          >
                            Profil
                          </Link>
                          <div>
                            <Link
                              to={URL_BOOKING}
                              className=" block py-2 px-2  hover:bg-rose-300 hover:text-black"
                            >
                              Mes Réservations
                            </Link>
                          </div>
                        </div>

                        <div className="py-1 text-white ">
                          <Link
                            onClick={handleSignOut}
                            to={URL_HOME}
                            className=" block py-2 px-2 hover:bg-rose-300 hover:text-black"
                          >
                            Déconnexion
                          </Link>
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
    </nav>
  );
};

export default Navbar;
