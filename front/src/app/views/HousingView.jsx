import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NewRate } from "../components/layouts/NewRate";
import Rate from "../components/layouts/Rate";
import HousingDetail from "../components/layouts/HousingDetail";
// Requete API
import { getHousing } from "../api/backend/housing";
import { getRatesByHousing } from "../api/backend/rate";

import { MdTravelExplore } from "react-icons/md";

const Housing = () => {
  const { id } = useParams();
  const [housing, setHousing] = useState(null);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    if (id) {
      getHousing(id)
        .then((housing) => {
          setHousing(housing.data);
        })
        .catch((err) => console.log(err));

      getRatesByHousing(id)
        .then((rates) => {
          setRates(rates.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (!housing) return <div>chargement</div>;

  if (housing.deleted)
    return (
      <>
        <p className="title-jedi text-3xl text-orange my-auto mx-auto">
          Ce logement est indisponible pour le moment
        </p>
        <MdTravelExplore className="text-terciary-light text-8xl m-4 mx-auto my-auto" />
        <Link
          to={`/destination/${housing.destination._id}`}
          className="flex justify-center"
        >
          <button className="bg-transparent hover:bg-terciary text-terciary hover:text-black border border-terciary-light hover:border-transparent flex items-center  px-3 rounded text-xs md:text-sm lg:text-xl font-Varino tracking-wider py-2 px-4  rounded">
            Retour sur {housing.destination.name}
          </button>
        </Link>
      </>
    );
    
  return (
    <div className="flex justify-center flex-col ">
      {housing._id && <HousingDetail housing={housing} />}
      {rates.length > 0 ? (
        <Rate rates={rates} housing={housing} />
      ) : (
        <NewRate housing={housing} />
      )}
    </div>
  );
};

export default Housing;
