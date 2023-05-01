import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Routes from "./routes/Routes";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { selectIsLogged, signIn } from "./redux-store/authenticationSlice";
import { getToken } from "./services/tokenServices";
import "../app/assets/styles/base/generalCss.css";
import { gapi } from "gapi-script";


const App = () => {
   const isLogged = useSelector(selectIsLogged);
   const dispatch = useDispatch();
   const [isLogin, setIsLogin] = useState(true);

   useEffect(() => {
      const token = getToken();
      if (token) dispatch(signIn(token));
      setIsLogin(false);
   }, []);

   useEffect(() => {
      function start() {
         gapi.client.init({
            clientId: import.meta.env.VITE_APP_CLIENT_ID,
            scope: ""
         })
      };
      gapi.load('client:auth2', start);
   })

   if (isLogin) return null;

   return (
      <>
         <BrowserRouter>
            <div className="flex h-full min-h-screen cursor-default relative flex-col bg-zinc-800">
               {isLogged}
               <Navbar />
               <Routes />
               <Footer />
            </div>
         </BrowserRouter>
      </>
   );
};

export default App;
