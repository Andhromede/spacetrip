import React from "react";
import { Link } from "react-router-dom";
import { Housing } from "./Housing";
import Activity from "./Activity";
import { URL_DESTINATIONS } from "../../constants/urls/urlFrontEnd";
import { MdTravelExplore } from "react-icons/md";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { TbLoaderQuarter } from "react-icons/tb";

export default function Destination({ destinationSelected }) {
  if (destinationSelected.deleted)
    return (
      <div className="mt-28">
        <p className="title-jedi text-3xl text-orange text-center m-2">
          {destinationSelected.name} est indisponible pour le moment
        </p>
        <MdTravelExplore className="text-terciary-light text-8xl my-8 mx-auto my-auto" />
        <Link
          className=""
          to={URL_DESTINATIONS}
        >
          <button className="mx-auto my-10 bg-transparent hover:bg-terciary text-terciary hover:text-black border border-terciary-light hover:border-transparent flex items-center  px-3 rounded text-xs md:text-sm lg:text-xl font-Varino tracking-wider py-2 px-4  rounded">
            Venez découvrir nos autres destinations
          </button>
        </Link>
      </div>
    );

  return (
    <div className="pt-20">
      
     
      <div className="flex justify-center w-full flex-col justify-center items-center ">
        <h2 className="text-center mt-2 text-4xl md:text-5xl title-jedi text-primary ">
          {destinationSelected.name}
        </h2>
        <div>
          <div className="border-b-2 mx-auto w-full mt-4 md:w-[70%] ">
            <div className="ml-auto mr-auto w-[50%] lg:w-[44%] flex justify-center items-center w-full overflow-hidden rounded-lg">
              <img
                src={destinationSelected.picture}
                alt={"image de " + destinationSelected.name}
                className="h-full w-full object-cover object-center "
              />
            </div>
            <h3 className="text-center mt-4 text-2xl md:text-3xl font-Varino text-terciary hover:text-terciary-light tracking-wide">
              {destinationSelected.slogan}
            </h3>
            <p className=" text-center m-8 text-md sm:text-lg md:text-xl font-Typewriter text-secondary-light tracking-wider">
              {destinationSelected.description}
            </p>
            <div className="flex justify-center p-4 "> <BsArrowDownCircleFill className="animate-bounce text-orange text-4xl"/></div>
            {/* <div className="flex justify-center p-4 title-jedi text-terciary text-3xl items-center"> <TbLoaderQuarter className="animate-spin h-5 w-5 mr-3 text-orange text-4xl"/> Chargement</div> */}
          </div>
          {/* LOGEMENT */}
          <Housing
            key={destinationSelected._id}
            id_planet={destinationSelected._id}
          />
          {/* ACTIVITE */}
          { destinationSelected.activity?.length >= 1 && (
              <div className=" mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <p className="border-t-2 w-[80%] mx-auto pb-4"></p>
                <h2 className="text-center text-2xl text-terciary font-Starjedi tracking-wider">
                  nos activités
                </h2>
                <p className="text-center text-quaternary-light font-Typewriter tracking-wider text-lg mt-2 ">
                  Disponibles avec le pack premium pour seulement{" "}
                  <span>300 €</span> par voyageur
                </p>
                <div className="mt-4 flex flex-col flex-wrap sm:flex-row justify-center mt-20">
                  {destinationSelected &&
                    destinationSelected.activity?.map((activity) => {
                      return (
                        <Activity key={activity._id} activity={activity} />
                      );
                    })}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
