import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import RegisterSchema from "../../schema-yup/register-yup";
import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";
import { Register } from "./../../api/backend/account";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";


const FormRegister = () => {
  const [errorLog, setErrorLog] = useState(false);
  const recaptchaRef = useRef(null);


  const handleRegister = (values) => {
    const recaptchaValue = recaptchaRef.current.getValue();
    Register({email: values.email, password:values.password})
      .then((res) => { 
        if (res.status === 200) {
          toast.success("Un email vous à été envoyé.");
        }
      })
      .catch(() => setErrorLog(true));
  };

  return (
    <div className=" w-full max-w-md space-y-4 rounded-md bg-black bg-opacity-50 md:bg-opacity-85 py-8 px-4 sm:px-6 lg:px-8">
        <div>
          <ToastContainer
            autoClose={2500}
            theme="dark"
            position="bottom-right"
          />
        </div>
        <div className="hidden md:flex justify-center">
          <img
            className="h-24 "
            src="./src/app/assets/images/general/logo.png"
            alt="logo de space-trip"
          />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
          Inscription
        </h2>
      <hr />
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          recaptcha: "",
        }}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          values,
          touched,
          isSubmitting,
          errors,
          setFieldValue,
        }) => (
          <Form className="mt-8 space-y-6">
            <div className="flex flex-col space-y-3 rounded-md shadow-sm">
              <Field
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={values.email}
                autoComplete="email"
                className={
                  errors.email && touched.email
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.email && touched.email && (
                <p className="error text-[#ff0000]">{errors.email}</p>
              )}

              <Field
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={values.password}
                className={
                  errors.password && touched.password
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.password && touched.password && (
                <p className="error text-[#ff0000]">{errors.password}</p>
              )}

              <Field
                type="password"
                name="confirmPassword"
                placeholder="ConfirmPassword"
                autoComplete="current-password"
                value={values.confirmPassword}
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.confirmPassword && touched.confirmPassword && (
                <p className="error text-[#ff0000]">{errors.confirmPassword}</p>
              )}
            </div>
            <div>
              <ReCAPTCHA
              className="w-full mx-auto"
                ref={recaptchaRef}
                badge="inline"
                theme="dark"
                size="normal"
                sitekey={import.meta.env.VITE_APP_RECAPTCHA_KEY}
                render="explicit"
                onChange={(response) => {
                  setFieldValue("recaptcha", response);
                }}
              />
              {errors.recaptcha && (
                <p className="error text-[#ff0000]">{errors.recaptcha}</p>
              )}

              <button
                disabled={isSubmitting}
                type="submit"
                className="btn bg-rose-400 hover:bg-rose-300 group relative w-full py-2 px-4 rounded mt-4"
              >
                S'inscrire
              </button>

              <div className="mt-5 text-center text-white">
                Déjà inscrit ? C'est <Link to={URL_LOGIN}className="text-rose-400 hover:text-rose-300 font-bold"> Par ici</Link> !
              </div>
            </div>

            {errorLog && (
              <div className="flex justify-center">
                <small className="text-sm italic text-red-600">
                  Mot de passe incorrect(s)
                </small>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormRegister;
