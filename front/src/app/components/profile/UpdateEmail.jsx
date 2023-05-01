import  {React, useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import EmailSchema from "../../schema-yup/email-yup";
import { emailUpdate, profilGet } from "../../api/backend/profil";
import { signOut } from "../../redux-store/authenticationSlice";
import { useSelector, useDispatch } from "react-redux";
import "../../assets/styles/components/modal.css";
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

const FormUpdateEmail = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

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

  const [user, getUser] = useState();

  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    profilGet(userId, token)
      .then((res) => {
        if (res.status === 200) {
          getUser(res.data);
        }
      })
      .catch((err) => console.log(err));
  },[refresh]);

  const handleUpdEmail = (values) => {
    emailUpdate(values, userId)
      .then((res) => {
        if (res.status === 200 && res.data) {
          toast.success("Un email vous à été envoyé.");
          setTimeout(() => {
            dispatch(signOut());
          }, 4000)   
        }
      })
      .catch((error) => error);
  };

  if (!user) {
    return <div>Chargement</div>;
  }

  return (
    <div>
      <div>
        <ToastContainer autoClose={3500} theme="dark" position="bottom-right" />
      </div>
      <button onClick={toggleModal} className="md:py-4 lg:py-8 btn-modal flex font-[Starjedi] hover:text-[#f1f5f9]">
        <span className="pr-2"><MdEmail /></span> Modification de l'email
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Mon email</h2>
            <Formik
              validationSchema={EmailSchema}
              initialValues={user}
              onSubmit={(user) => {
                handleUpdEmail(user);
                closeModal();
              }}
            >
              {({ handleChange, handleBlur, values, touched, errors }) => (
                <Form className="mt-8 space-y-6">
                  <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                    {/* EMAIL */}
                    <Field
                      type="text"
                      name="email"
                      autoComplete="email"
                      value={values.email}
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
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormUpdateEmail;
