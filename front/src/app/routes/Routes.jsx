import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";
import { ROLE_ADMIN, ROLE_USER } from "../constants/rolesConstant";
import { PrivateRoute } from "./PrivateRoute";
import * as URL from "../constants/urls/urlFrontEnd";
import HomeView from "../views/HomeView";
import AuthView from "../views/AuthView";
import DestinationsView from "../views/DestinationsView";
import DestinationView from "../views/DestinationView";
import MentionsView from "../views/MentionsView";
import AboutUs from "../views/AboutUs";
import Faq from "../views/Faq";
import Bookings from "../views/Bookings";
import ProfilView from "../views/ProfilView";
import ContactView from "../views/ContactView";
import SearchFilterView from "../views/SearchFilterView";
import PanierView from "../views/PanierView";
import PaymentView from "../views/PaymentView";
import IsAvailable from "../views/IsAvailable";
import EmailValidateView from "../views/EmailValidateView";
import ForgotPasswordView from "../views/ForgotPasswordView";
import ResetPasswordView from "../views/ResetPasswordView";
import HousingView from "../views/HousingView";
import AdminHome from "../views/admin/AdminHomeView";
import NotFound from "../views/NotFound";



const Routes = () => {
   return (
      <>
         <RoutesContainer>
         <Route path='*' element={<NotFound />}/>
            <Route index element={<HomeView />} />
            <Route path={URL.URL_HOME} element={<HomeView />} />
            <Route path={URL.URL_LOGIN} element={<AuthView page="login" />} />
            <Route path={URL.URL_REGISTER} element={<AuthView page="register" />} />
            <Route path={URL.URL_ABOUT_US} element={<AboutUs page="about-us" />} />
            <Route path={URL.URL_DESTINATIONS} element={<DestinationsView page="destinations" />} />
            <Route path={URL.URL_DESTINATION} element={<DestinationView page="destination" />} />
            {/* TODO enlever le private route pour le profil*/}
            {/* <Route path={URL.URL_PROFIL} element={<ProfilView page="profil" />} /> */}
            <Route path={URL.URL_PROFIL} element={<PrivateRoute role={[ROLE_USER, ROLE_ADMIN]}> <ProfilView page="profil" /> </PrivateRoute>} />
            <Route path={URL.URL_FAQ} element={<Faq page="faq" />} />
            <Route path={URL.URL_BOOKING} element={<Bookings page="bookings" />} />
            <Route path={URL.URL_MENTIONS} element={<MentionsView page="mentions-legales" />} />
            <Route path={URL.URL_CONTACT} element={<ContactView page="contact" />} />
            <Route path={URL.URL_FILTER} element={<SearchFilterView page="search" />} />
            <Route path={URL.URL_PANIER} element={<PanierView page="panier" />} />
            <Route path={URL.URL_DISPONIBILITY} element={<IsAvailable page="disponibilites" />} />
            <Route path={URL.URL_VALIDATE_EMAIL} element={<EmailValidateView page="validation-email" />} />
            <Route path={URL.URL_PAYMENT} element={<PrivateRoute role={[ROLE_USER]}><PaymentView page="payment" /></PrivateRoute>} />
            <Route path={URL.URL_FORGOT_PASSWORD} element={<ForgotPasswordView page="forgot-password" />} />
            <Route path={URL.URL_RESET_PASSWORD} element={<ResetPasswordView page="reset-password" />} />
            <Route path={URL.URL_HOUSING} element={<HousingView page="logement" />} />


            {/********* ROUTES ADMIN *********/}
            <Route path={URL.URL_ADMIN_HOME}>
               <Route index element={<PrivateRoute role={[ROLE_ADMIN]}> <AdminHome/> </PrivateRoute>} />
            </Route>



            {/* <Route path="/admin" element={<PrivateRoute role={[ROLE_ADMIN]}> <Admin dataProvider={dataProvider} /> </PrivateRoute>} > */}

            {/* <Route path="/admin" element={<PrivateRoute role={[ROLE_ADMIN]}> <Admin dataProvider={dataProvider} /> </PrivateRoute>} >

               <Route index element={
                  <PrivateRoute role={[ROLE_ADMIN]}>
                     <Admin dataProvider={dataProvider}/>
                  </PrivateRoute>}>
               </Route>

            </Route> */}



         </RoutesContainer>
      </>
   );
};

export default Routes;