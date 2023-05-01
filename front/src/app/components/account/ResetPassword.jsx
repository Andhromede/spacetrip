import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";
import { Reset_Password } from "./../../api/backend/account";
import PasswordSchema from "../../schema-yup/password-yup";
import { ToastContainer, toast } from "react-toastify";


const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetLink = searchParams.get("resetLink");


  const handleResetPassword = (values) => {
    Reset_Password({password:values.password,resetLink: resetLink})
      .then((res) => {
        if (res.status === 200) {
          toast.success("Votre mot de passe à bien été mis à jour.");
          setTimeout(() => {
            navigate(URL_LOGIN);
          }, 2200) 
        }
      })
      .catch(() => error);
  };

  return (
    <div className="mx-auto mt-20  w-full max-w-md space-y-8 rounded-md bg-black opacity-85  py-10 px-4 shadow sm:px-6 lg:px-8">
        <ToastContainer autoClose={2000} theme="dark" position="bottom-right" />
      <div>

          <img className="w-auto h-[16em] " src="./src/app/assets/images/general/logo.png" alt="logo de space-trip" />

        <h2 className="mt-6 text-center text-4xl font-extrabold text-white">
          Modification de mot de passe
        </h2>
      </div>

      <hr />

      <Formik
        validationSchema={PasswordSchema}
        initialValues={{password: ""}}
        onSubmit={handleResetPassword}
      >
        {({ handleChange, handleBlur, values, touched, errors }) => (
          <Form className="mt-8 space-y-6">
            <div className="flex flex-col space-y-3 rounded-md shadow-sm">
            <Field
                type="password"
                name="password"
                placeholder="Nouveau mot de passe"
                autoComplete="current-password"
                value={values.password}
                className={errors.password && touched.password ? "border-2 border-rose-600 w-full rounded-[10px]" : "border-2 w-full rounded-[10px]"}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.password && touched.password && <p className='error text-[#ff0000]'>{errors.password}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="btn bg-rose-400 hover:bg-rose-300 group relative w-full py-2 px-4 rounded"
              >
                Modifier
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;