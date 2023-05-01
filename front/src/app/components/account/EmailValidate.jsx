import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { URL_LOGIN } from "../../constants/urls/urlFrontEnd";
import { ValidateAccount } from "./../../api/backend/account";
import {FcApproval} from "react-icons/fc"
import { ToastContainer, toast } from "react-toastify";


const EmailValidation = () => {
  const notifyRed = (notification) => toast.error(notification);
  const notify = (notification) => toast.success(notification);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isToken = searchParams.get("isToken");


  const handleEmailValidate = () => {
    ValidateAccount({isToken: isToken})
      .then((res) => {
        if (res.status === 200) {
          notify(res.data.message)
          setTimeout(() => {
            navigate(URL_LOGIN);
          }, 2200) 
        }
      })
      .catch((error) => {
        notifyRed(error.response?.data?.error)
      });
  };

  return (
    <div className="mx-auto mt-24 max-w-md space-y-8 rounded-md bg-black bg-opacity-75 px-4 py-8 shadow sm:px-6 lg:px-8">
      <FcApproval className="mx-auto flex items-center text-[10em] md:text-[350px] mb-5" aria-hidden="true"/>
        <button onClick={handleEmailValidate} type="submit" className="btn group relative w-full py-2 px-4 hover:bg-zinc-800 rounded border-4 border-lime-300 hover:border-lime-200">
            <span className="text-lime-300 group-hover:text-lime-200"> Cliquez ici pour valider votre email </span>
        </button>
        <ToastContainer autoClose={2000} theme="dark" position="bottom-right" />
    </div>
  );
};

export default EmailValidation;