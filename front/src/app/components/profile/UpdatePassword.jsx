import React, { useState, useEffect } from "react";
import UpdatePasswordSchema from "../../schema-yup/updpassword-yup";
import { signOut } from "../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";
import "../../assets/styles/components/modal.css";
import { HiLockClosed } from "react-icons/Hi";
import { passwordUpdate } from "../../api/backend/profil";
import { Field, Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";


const FormUpdatePassword = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const closeModal = () => {
    setModal(!modal);
  };


  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);


  const handleUpdPassword = (values) => {
    values.confirmPassword = undefined;
    passwordUpdate(values, userId, token)
      .then((res) => {
        if (res.status === 200 && res.data) {
          toast.success("Votre mot de passe a été mis à jour");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(signOut())
        }
        console.log(err)});
  };



  return (
    <>
      <div>
        <ToastContainer autoClose={3500} theme="dark" position="bottom-right" />
      </div>
      <button onClick={toggleModal} className="md:py-4 lg:py-8 btn-modal flex title-jedi hover:text-[#f1f5f9]">
        <span className="pr-2"><HiLockClosed /></span>Modification du mot de passe
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <Formik
              validationSchema={UpdatePasswordSchema}
              initialValues={{ 
                oldPassword: "", 
                password: "",
                confirmPassword: "" 
            }} 
              onSubmit={(user) => {
                handleUpdPassword(user);
                closeModal();
              }}
            >
              {({ handleChange, handleBlur, values, touched, errors }) => (
                <Form className="mt-8 space-y-6">
                  <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                    {/* OLD PASSWORD */}
                    <Field
                      type="password"
                      name="oldPassword"
                      placeholder="OldPassword"
                      autoComplete="current-password"
                      value={values.oldPassword}
                      className={
                        errors.oldPassword && touched.oldPassword
                          ? "border-2 border-rose-600 w-full rounded-[10px]"
                          : "border-2 w-full rounded-[10px]"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {errors.oldPassword && touched.oldPassword && (
                      <p className="error text-[#ff0000]">{errors.oldPassword}</p>
                    )}

                    {/* NEW PASSWORD */}
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

                    {/* CONFIRM PASSWORD */}
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="ConfirmPassword"
                      autoComplete="current-password"
                      value={values.confirmPassword}
                      className={errors.confirmPassword && touched.confirmPassword ? "border-2 border-rose-600 w-full rounded-[10px]" : "border-2 w-full rounded-[10px]"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {errors.confirmPassword && touched.confirmPassword && <p className='error text-[#ff0000]'>{errors.confirmPassword}</p>}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn bg-rose-400 hover:bg-rose-300 relative w-full py-2 px-4 rounded"
                    >
                      Valider
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
)}

export default FormUpdatePassword;
