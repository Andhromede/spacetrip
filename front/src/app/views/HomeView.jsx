import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROLE_USER, ROLE_ADMIN } from "../constants/rolesConstant";
import { URL_ADMIN_HOME } from "../constants/urls/urlFrontEnd";
import { selectHasRole } from "../redux-store/authenticationSlice";
// import Slider from "../components/layouts/Slider";
import Carrousel from "../components/layouts/CarrouselPicture";
import ImageHome from "../assets/images/general/home.jpg";
import StarIcon from "../assets/images/general/iconEtoile.png";
import MoneyBag from "../assets/images/general/iconMoneyBag.png";
import { destinations } from "./../api/backend/destination";
import { getAllHousings } from "./../api/backend/housing";

const HomeView = () => {
   const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
   const isUser = useSelector((state) => selectHasRole(state, ROLE_USER));
   const navigate = useNavigate();
   const [tabDestinations, setTabDestinations] = useState([]);
   const [tabHousing, setTabHousing] = useState([]);

   useEffect(() => {
      destinations()
         .then((res) => {
            if (res.status === 200) {
               setTabDestinations(res.data);
            }
         })
         .catch((err) => console.log(err));

      getAllHousings()
         .then((housings) => {
            setTabHousing(housings.data);
         })
         .catch((err) => console.log(err));
   }, []);

   return (
      <div>
         {isAdmin && (
            <button className="btn btn-primary" onClick={() => navigate(URL_ADMIN_HOME)}>
               Admin
            </button>
         )}

         {isUser && <div className="mx-auto sm:py-24 sm:px-6 lg:px-8">User</div>}

         <div className="mx-auto h-full">
            <div className="mt-14">
               <img className="h-[70vh] w-screen object-cover" src={ImageHome} alt="" />
            </div>

            <p className="mt-8 font-Ananda text-center text-2xl text-terciary-light tracking-wider">
               « Le plus beau voyage, c'est celui qu'on n’a pas encore fait »
            </p>
<div className="mx-auto md:w-[80%] lg:w-[50%] ">
            <Carrousel data={tabDestinations}></Carrousel>
</div>

            <div className="mt-4 flex justify-center">
               <h2 className="text-center title-jedi text-white my-8  underline decoration-primary-dark">
                  Nos destinations
               </h2>
               <img className="h-[30px] my-auto pl-2" src={StarIcon} alt="" />
            </div>
            <div className="mx-auto md:w-[80%] lg:w-[50%] ">
            {/* <Slider page="home" data={tabDestinations}></Slider> */}
            </div>
            <div className="flex justify-center">
               <h2 className="text-center title-jedi text-white my-10 underline decoration-primary-dark">
                  Nos voyages les plus vendus
               </h2>
               <img className="h-[25px] my-auto pl-2" src={MoneyBag} alt="" />
            </div>

            {/* <Slider page="home" data={tabHousing}></Slider> */}
         </div>
      </div>
   );
};

export default HomeView;
