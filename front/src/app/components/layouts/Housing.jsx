import { React, useState, useEffect } from "react";
import { getHousingByDestination } from "../../api/backend/housing";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Housing = ({ id_planet }) => {
  const [housings, setHousings] = useState([]);
  const id = id_planet;

  useEffect(() => {
    if (id) {
      getHousingByDestination(id)
        .then((housingsSelected) => {
          setHousings(housingsSelected.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (housings.deleted) return <div className="title-jedi"> Le logement est indisponible pour le moment</div>

  return (
    <div className=" flex justify-around items-center flex-col">
      <div className="mt-2 flex justify-center items-center flex-col ">
        <h2 className="mt-4 text-2xl text-terciary title-jedi">
          nos logements
        </h2>
        <div className="text-secondary-light text-center w-3/4 md:w-2/3 mt-4 text-md font-sans ">
          Fini les chambres d’hôtels qui se ressemblent toutes… <br />
          En vacances, le logement est aussi important que la destination !{" "}
          <br />
          Et quelle meilleure façon de rendre son séjour{" "}
          <span className="text-lg font-semibold text-quaternary-light">
            inoubliable
          </span>{" "}
          que de passer la nuit dans un logement{" "}
          <span className="text-lg font-semibold text-quaternary-light">
            insolite
          </span>{" "}
          ?<br />
          <p className="mt-4 text-xl text-quaternary-light">
            {" "}
            En famille, en couple ou entre amis, sortez des sentiers battus !
          </p>
        </div>
        <div className="p-2 mt-6 flex justify-center gap-4 flex-wrap "
        >
         
          {housings &&
            housings.map((housing, index) => {
              return (
                <div
                  key={housing._id}
                  className={(housings.length <= 2) ? "lg:w-[40%] sm:w-[50%] mx-auto border-2" : "mx-auto border-2 lg:w-[30%] sm:w-[60%]" }
                >
                  <div className="bg-black ">
                    <div className=" min-h-80 h-60 aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 opacity-85 group-hover:opacity-100 lg:aspect-none">
                      {housing.picture[0] && (
                        <img
                        src={housing.picture[0].path}
                          alt={`image du logement ${housing.name}`}
                          className=" h-full w-full object-cover object-center "
                        />
                      )}
                    </div>
                    <div className="p-4 text-lg flex flex-col justify-between font-Typewriter tracking-wider">
                      <div className="flex flex-row">
                        <h3 className="grow mt-1 text-xl text-primary font-Varino flex flex-row ">
                          <span aria-hidden="true" className="text-center">
                            {housing.name}
                          </span>
                        </h3>
                        <p className="text-xl self-end flex flex-row text-terciary content-center items-center">
                          <BsPerson className=" text-right" />
                          <span className="pl-1 text-terciary-light">
                            {housing.nbrPersons}
                          </span>
                        </p>
                      </div>
                      <div className="mt-4 md:text-[.9em] h-40 overflow-auto ">
                        <div className=" pr-6 text-justify text-secondary-light font-Typewriter">
                          {housing.description}
                        </div>
                      </div>
                    </div>
                    <div className="py-2 text-sm flex flex-col items-center gap-2">
                      <Link to={`/logement/${housing._id}`}>
                      <button className="mt-1 bg-transparent hover:bg-terciary-dark text-primary font-Varino tracking-wider hover:text-black py-2 px-4 border border-terciary hover:border-transparent rounded">
                        Plus d'infos
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
