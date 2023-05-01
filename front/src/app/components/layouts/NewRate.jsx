import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import RateSchema from "../../schema-yup/rate-yup";
import ReactStarsRating from "react-awesome-stars-rating";
import { ToastContainer, toast } from "react-toastify";
// Requete API
import { createRate, getRatesByUser } from "../../api/backend/rate";
import { getBookingByIdUser } from "../../api/backend/booking";

export const NewRate = ({ housing }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [note, setNote] = useState(0);
  const notify = (notification) => toast.success(notification);
  const notifyError = (notification) => toast.error(notification);
  const [userAuthorised, setUserAuthorised] = useState(false);

  useEffect(() => {
    if (user && housing) {
      getBookingByIdUser(user.id, token)
        .then((res) => {
          res.data.map((booking) => {
            // Verifier si user a une reservation sur ce logement
            booking.housing.map((housingSelected) => {
              if (housingSelected._id === housing._id) {
                // Si user a déja déposé un avis
                getRatesByUser(user.id, token)
                .then((rates) => {
                  let findRate = rates.data.find((rate) => rate.housing._id === housing._id);
                  if (!findRate) setUserAuthorised(true);

                });
              }
            });
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleRate = (values, { resetForm }) => {
    if (note > 0) {
      values.rate = note;
      values.user = user.id;
      values.housing = housing._id;
      createRate(values, token)
        .then(() => {
          notify("Avis enregistré");
          setTimeout(() => {
            setUserAuthorised(false);
          }, 3000) 
        })
        .catch((err) => {
          console.log(err);
        });
    } else notifyError("Veuillez selectionnez une note");
  };

  return (
    <>
      {userAuthorised ? (
        <div>
          <ToastContainer
            autoClose={3500}
            theme="dark"
            position="bottom-right"
          />
            <blockquote className=" w-3/4 md:w-1/3 max-w-sm mx-auto mb-10 items-center flex bg-[#020107] bg-opacity-85 flex-col justify-between p-2 ">
              <h2 className="sr-only">Laissez un avis</h2>
              <div className="my-2">
                <ReactStarsRating
                  onChange={(value) => setNote(value)}
                  value={note}
                  primaryColor="#f6f591"
                  className="flex gap-0.5 justify-center mt-2"
                />
                <Formik
                  enableReinitialize
                  validationSchema={RateSchema}
                  initialValues={{
                    title: "",
                    comment: "",
                  }}
                  onSubmit={handleRate}
                >
                  {({
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                    isSubmitting,
                  }) => (
                    <Form className="mt-8 space-y-6">
                      <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                        <Field
                          type="text"
                          name="title"
                          placeholder="Titre"
                          value={values.title}
                          autoComplete="title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <Field
                          as="textarea"
                          rows="4"
                          name="comment"
                          placeholder="Commentaire"
                          value={values.comment}
                          autoComplete="comment"
                          className={
                            errors.comment && touched.comment
                              ? "border-2 border-red-400"
                              : "border-2 border-violet-600"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.comment && touched.comment && (
                          <p className="error">{errors.comment}</p>
                        )}
                      </div>

                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn text-black focus:bg-purple bg-rose-300 w-full py-2 px-4 rounded"
                      >
                        Envoyer
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </blockquote>
        </div>
      ): " "}
    </>
  );
};
