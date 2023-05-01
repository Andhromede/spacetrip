import React from "react";
import { Link } from "react-router-dom";
import { URL_DESTINATIONS } from "../constants/urls/urlFrontEnd";
import Astro from "../components/layouts/Astro";

const NotFound = () => {
  return (
    <div className="mt-28 sm:mt-20 w-full flex flex-wrap">
      <div className=" sm:my-auto sm:mx-auto">
        <h1 className="mt-80 sm:mt-0 title-jedi text-5xl">404 not found</h1>
        <Link className="mx-auto my-auto p-4 " to={URL_DESTINATIONS}>
          <button className="mx-auto my-10 bg-transparent hover:bg-terciary text-terciary hover:text-black border border-terciary-light hover:border-transparent flex items-center  px-3 rounded text-xs md:text-sm lg:text-xl font-Varino tracking-wider py-2 px-4  rounded">
            Venez découvrir nos destinations
          </button>
        </Link>
      </div>
      {/* <div className="mx-auto">
        <Astro /> */}
      <div className="sm:w-1/3">
        <img
          className="object-cover"
          src="https://firebasestorage.googleapis.com/v0/b/space-trip-b44d5.appspot.com/o/general%2Fstop_mars.jpg?alt=media&token=3ba63a9b-83dd-4243-9fdd-1e7c42a4a3d5"
        />
      </div>
    </div>
  );
};

export default NotFound;
