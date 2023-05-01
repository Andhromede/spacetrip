import React from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { Forgot_Password } from "./../../api/backend/account";
import EmailSchema from "../../schema-yup/email-yup";
import { ToastContainer, toast } from "react-toastify";


const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForgotPassword = (values) => {
    Forgot_Password(values)
      .then((res) => {
        if (res.status === 200) {
            toast.success("Un email vous à été envoyé.");
            setTimeout(() => {
              navigate(URL_LOGIN);
            }, 2600) 
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="mt-28 mx-auto w-full max-w-md rounded-md bg-black opacity-85 p-4 py-10 shadow sm:px-6 lg:px-8">
        <ToastContainer autoClose={2500} theme="dark" position="bottom-right" />
          <img className="mx-auto h-16" src="./src/app/assets/images/general/logo.png" alt="logo de space-trip" />
        <h2 className="mt-6 text-center text-4xl font-extrabold text-white border-b">
          Mot de passe oublié ?
        </h2>
      <Formik
        validationSchema={EmailSchema}
        initialValues={{email: ""}}
        onSubmit={handleForgotPassword}
      >
        {({ handleChange, handleBlur, values, touched, errors }) => (
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
            </div>
              <button
                type="submit"
                className="btn bg-rose-400 hover:bg-rose-300 group relative w-full py-2 px-4 rounded"
              >
                Envoyer
              </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;