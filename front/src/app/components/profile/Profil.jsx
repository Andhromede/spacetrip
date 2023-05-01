import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { profilUpdate } from "../../api/backend/profil";
import { profilGet } from "../../api/backend/profil";
import { signOut } from "../../redux-store/authenticationSlice";
import FormAvatar from "./Avatar";
import ProfilSchema from "../../schema-yup/profil-yup";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const FormProfil = () => {
  const [user, getUser] = useState();
  // let {id} = useParams();
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    profilGet(userId, token)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          getUser(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(signOut());
        }
        console.log(err);
      });
  }, [refresh]);

  const handleProfil = (values) => {
    profilUpdate(values, userId, token)
      .then((res) => {
        if (res.status === 200 && res.data) {
          toast.success("Votre profil à été mis à jour.");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(signOut());
        }
        console.log(err);
      });
  };

  if (!user) {
    return <div>Chargement</div>;
  }

  return (
    <div className="w-full mx-auto max-w-md space-y-8 rounded-md bg-black p-4 py-12 shadow sm:px-6 lg:px-8">
      <div>
        <div>
          <ToastContainer
            autoClose={3500}
            theme="dark"
            position="bottom-right"
          />
        </div>
        <div className="flex justify-center">
          <img
            className="w-auto cursor-pointer h-[200px] rounded-[50%] border-4 border-white-500 "
            src={user.avatar}
            alt=""
            width={800}
            height={160}
          />
        </div>
        <FormAvatar setRefresh={setRefresh} />
        <h2 className="mt-4 text-center text-xl md:text-4xl font-extrabold text-white">
          Mes informations
        </h2>
      </div>

      <hr />

      <Formik
        validationSchema={ProfilSchema}
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          addAdress: user.addAdress,
          city: user.city,
          zipCode: user.zipCode,
          country: user.country,
          phone: user.phone,
        }}
        onSubmit={(user) => {
          handleProfil(user);
        }}
      >
        {({ handleChange, handleBlur, values, touched, errors }) => (
          <Form className="mt-8 space-y-6">
            <div className="flex flex-col space-y-3 rounded-md shadow-sm">
              {/* PRENOM */}
              <Field
                type="text"
                name="firstName"
                placeholder={"Prénom"}
                value={values.firstName}
                className={
                  errors.firstName && touched.firstName
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && touched.firstName && (
                <p className="error text-[#ff0000]">{errors.firstName}</p>
              )}

              {/* NOM */}
              <Field
                type="text"
                name="lastName"
                placeholder={"Nom"}
                value={values.lastName}
                className={
                  errors.lastName && touched.lastName
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && touched.lastName && (
                <p className="error text-[#ff0000]">{errors.lastName}</p>
              )}

              {/* ADDRESS */}
              <Field
                type="text"
                name="address"
                placeholder={"Adresse"}
                value={values.address}
                className={
                  errors.address && touched.address
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.address && touched.address && (
                <p className="error text-[#ff0000]">{errors.address}</p>
              )}

              {/* ADDADRESS */}
              <Field
                type="text"
                name="addAdress"
                placeholder={"Complément d'adresse"}
                value={values.addAdress}
                className={
                  errors.addAdress && touched.addAdress
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.addAdress && touched.addAdress && (
                <p className="error text-[#ff0000]">{errors.addAdress}</p>
              )}

              {/* CITY */}
              <Field
                type="text"
                name="city"
                placeholder={"Ville"}
                value={values.city}
                className={
                  errors.city && touched.city
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.city && touched.city && (
                <p className="error text-[#ff0000]">{errors.city}</p>
              )}

              {/* CODE POSTAL */}
              <Field
                type="text"
                name="zipCode"
                placeholder={"Code Postal"}
                value={values.zipCode}
                className={
                  errors.zipCode && touched.zipCode
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.zipCode && touched.zipCode && (
                <p className="error text-[#ff0000]">{errors.zipCode}</p>
              )}

              {/* COUNTRY */}
              <Field
                type="text"
                name="country"
                placeholder={"Pays"}
                value={values.country}
                className={
                  errors.country && touched.country
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.country && touched.country && (
                <p className="error text-[#ff0000]">{errors.country}</p>
              )}

              {/* PHONE */}
              <Field
                type="text"
                name="phone"
                placeholder={"Téléphone"}
                value={values.phone}
                className={
                  errors.phone && touched.phone
                    ? "border-2 border-rose-600 w-full rounded-[10px]"
                    : "border-2 w-full rounded-[10px]"
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.phone && touched.phone && (
                <p className="error text-[#ff0000]">{errors.phone}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="btn bg-rose-400 hover:bg-rose-300 group relative w-full py-2 px-4 rounded"
              >
                Valider
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormProfil;
