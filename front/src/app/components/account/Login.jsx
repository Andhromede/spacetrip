import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginSchema from "../../schema-yup/login-yup";
import { URL_HOME, URL_REGISTER, URL_FORGOT_PASSWORD } from "../../constants/urls/urlFrontEnd";
import { signIn } from "../../redux-store/authenticationSlice";
import { Login } from "./../../api/backend/account";
// import LoginButton from "../Auth0.jsx/LoginAuth0/";
// import LogoutButton from "../Auth0.jsx/LogoutAuth0";
// import {gapi} from "gapi-script";



const FormLogin = () => {
  const [errorLog, setErrorLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleLogin = (values) => {
    Login(values)
      .then((res) => {
        if (res.status === 201 && res.data.token) {
          dispatch(signIn(res.data.token));
          window.location.reload()
          navigate(URL_HOME);
        } 
      })
      .catch(() => {
        setErrorLog(true);
      }
      );
  };

  return (
    <div className="lg:my-8 w-full max-w-md space-y-8 rounded-md bg-black bg-opacity-50 md:bg-opacity-85 p-8  px-4 shadow sm:px-6 lg:px-8">
        <div className=" hidden md:flex justify-center" >
          <img className="h-24 " src="./src/app/assets/images/general/logo.png" alt="logo de space-trip" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Connexion
        </h2>
      <hr />
      <Formik
        validationSchema={LoginSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, values, touched, isSubmitting, errors, }) => (
          <Form className="mt-8 space-y-6">
            <div className="flex flex-col space-y-3 rounded-md shadow-sm">
              <Field
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                autoComplete="email"
                className={errors.email && touched.email ? "border-2 border-rose-600 w-full rounded-[10px]" : "border-2 w-full rounded-[10px]"}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.email && touched.email && <p className='error text-[#ff0000]'>{errors.email}</p>}

              <Field
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={values.password}
                className={errors.password && touched.password ? "border-2 border-rose-600 w-full rounded-[10px]" : "border-2 w-full rounded-[10px]"}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.password && touched.password && <p className='error text-[#ff0000]'>{errors.password}</p>}

            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm">
                <Link to={URL_FORGOT_PASSWORD} onClick={() => notify("Un email vous a été envoyé")}>
                  <span className="text-sm cursor-pointer font-bold text-rose-400 hover:text-rose-300">
                    Mot de passe oublié ?
                  </span>
                </Link>
              </div>
            </div>

            <div>
              <button
                // disabled={isSubmitting}
                type="submit"
                className="btn bg-rose-400 hover:bg-rose-300 group relative w-full py-2 px-4 rounded"
              >
                Se connecter
              </button>

              <div className="mt-5 text-center text-white">
                Pas encore inscrit ? C'est
                <Link to={URL_REGISTER} className="text-rose-400 hover:text-rose-300 font-bold"> Par ici </Link>
                !
              </div>

            </div>
            {errorLog && (
              <div className="flex justify-center">
                <small className="text-sm italic text-red-600">
                  Utilisateur/Mot de passe incorrect(s)
                </small>
              </div>
            )}
          </Form>
        )}
      </Formik>
      {/* <hr />
          <LoginButton />
          <LogoutButton />  */}
    </div>
  );
};

export default FormLogin;
