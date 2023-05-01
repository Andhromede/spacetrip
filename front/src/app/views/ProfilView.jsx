import React from "react";
import FormProfil from "../components/profile/Profil";
import FormUpdateEmail from "../components/profile/UpdateEmail";
import FormUpdatePassword from "../components/profile/UpdatePassword";
import imgProfil from "../assets/images/general/004.png";

const ProfilView = () => {
  return (
    <>
      <div>
        <img
          className="w-full md:h-[100vh] mx-auto object-cover  rounded-b-xl"
          src={imgProfil}
          alt=""
        />
      </div>

      <h1 className="mx-auto py-2 md:py-10 title-jedi text-center text-rose-300 text-2xl md:text-5xl">
        Mon Profil
      </h1>

      <div className="flex justify-evenly flex-wrap flex-col-reverse lg:flex-row my-8 h-full mx-6">
        <div className=" bg-[#909090] rounded-[5px] h-full text-sm sm:text-md md:p-4 lg:p-10 mx-auto border border-slate-300 hover:border-slate-400 ">
          <FormUpdatePassword />
          <FormUpdateEmail />
        </div>
        <FormProfil />
      </div>
    </>
  );
};

export default ProfilView;
