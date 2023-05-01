import { React, useState } from "react";
import { Field, Form, Formik } from "formik";
import ContactFormSchema from "../../schema-yup/contactForm-yup";
import emailjs from "@emailjs/browser";
import Modal from "./Modal";

const ContactForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const public_key = import.meta.env.VITE_APP_PUBLIC_KEY;

  const sendFeedback = (serviceId, templateId, variables) => {
    emailjs
      .send(serviceId, templateId, variables, public_key)
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (values, {resetForm}) => {
    setOpenModal(true);
    const templateId = "template_h6glfl8";
    const serviceId = "service_e8svcwt";
    sendFeedback(serviceId, templateId, {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    });
    resetForm()

  };




  return (
    <div className="mt-24">
      <p className=" w-full text-terciary-light font-Starjedi tracking-wider text-center text-4xl text-align-center mt-[40px] mb-[10px]">
        Formulaire de contact
      </p>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Merci pour votre message"
        content="Il sera traité au plus vite par notre secrétaire Caroline de l'espace."
      />
      <div className="flex ">
        <Formik
          validationSchema={ContactFormSchema}
          initialValues={{
            name: "",
            email: "",
            subject: "",
            message: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values, touched, errors }) => (
            <Form className="p-4 max-w-5xl  m-auto flex flex-col">
              <Field
                className={
                  errors.name && touched.name
                    ? "border-2 border-rose-600 w-[500px] rounded-lg my-2"
                    : "border-2 w-[500px] rounded-lg my-2"
                }
                type="text"
                name="name"
                id="name"
                placeholder="Nom"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />

              {errors.name && touched.name && (
                <p className="error">{errors.name}</p>
              )}
              <Field
                className={
                  errors.email && touched.email
                    ? "border-2 border-rose-600 w-[500px] rounded-lg my-2"
                    : "border-2 w-[500px] rounded-lg my-2"
                }
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="E-mail"
              />

              {errors.email && touched.email && (
                <p className="error">{errors.email}</p>
              )}

              <Field
                className="rounded-lg my-2"
                type="text"
                id="subject"
                name="subject"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subject}
                placeholder="Sujet"
              ></Field>

              <Field
                as="textarea"
                className={errors.message && touched.message?"h-[200px] rounded-lg my-2 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md  pr-3  focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-lg border-2 border-rose-600 w-full rounded-lg":"h-[200px] rounded-lg my-2 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md  pr-3  focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-lg"}
                type="text"
                id="message"
                onChange={handleChange}
                onBlur={handleBlur}
                name="message"
                value={values.message}
                placeholder="Message"
              />

              {errors.message && touched.message && (
                <p className="error">{errors.message}</p>
              )}

              <button
                type="submit"
                className="rounded-md text-lg font-semibold bg-terciary hover:bg-terciary-light w-36 h-10 mx-auto mt-4"
              >
                Envoyer
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
