import { React, useState, useEffect } from "react";
import Slider from "../../components/layouts/Slider";
import { Link } from "react-router-dom";
import { capitalize } from "../../constants/functions";
// Requete API
import { getRatesByHousing } from "../../api/backend/rate";

// ICONE
import { ImLocation } from "react-icons/im";
import { BsPerson } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function HousingDetail({ housing }) {
  const [tabRates, setTabRates] = useState([]);
  const [averageStar, setAverageStar] = useState(0);

  useEffect(() => {
    getRatesByHousing(housing._id)
      .then((comments) => {
        comments.data.map((comment) => tabRates.push(comment.rate));
        if (tabRates.length > 0) {
          let result = 0;
          tabRates.map((note) => (result += note));
          result = Math.floor(result / tabRates.length);
          setAverageStar(result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-10 flex mx-auto my-auto">
      <div className="m-10 border-[1px] border-secondary-dark bg-black rounded">
        <div className=" flex flex-col-reverse md:grid md:grid-cols-3 ">
          <div className="flex justify-between lg:mt-2 ml-2">
            <div className="text-secondary-light flex flex-col  ">
              <h1 className=" text-primary mb-2 font-Starjedi tracking-widest text-2xl md:text-3xl">
                {housing.name}
              </h1>
              <p className=" flex justify-center items-center font-Varino text-lg md:text-2xl text-2xl ">
                <ImLocation className="text-lg md:text-2xl text-terciary" />
                {capitalize(housing.destination.name)}
              </p>
              <section className="text-secondary-light text-justify text-lg lg:text-2xl md:text-xl mx-2 lg:mx-8 p-2 my-2 md:my-auto h-32 md:h-60 overflow-auto">
                {housing.description}
              </section>
              <div className="m-2 flex flex-col justify-center gap-2 md:my-10">
                <Link
                  to={`/disponibilites/${housing._id}`}
                  className="flex justify-center "
                >
                  <button className="bg-terciary hover:bg-transparent hover:text-terciary flex items-center px-3 rounded text-xs md:text-sm text-black font-Varino tracking-wider py-2 px-4 border border-transparent hover:border-terciary-light rounded">
                    Voir les disponibilités
                  </button>
                </Link>
                <Link
                  to={`/destination/${housing.destination._id}`}
                  className="flex justify-center"
                >
                  <button className="bg-transparent hover:bg-terciary text-terciary hover:text-black border border-terciary-light hover:border-transparent flex items-center  px-3 rounded text-xs md:text-sm font-Varino tracking-wider py-2 px-4  rounded">
                    Retour sur {housing.destination.name}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-2 ">
            {housing.picture.length == 1 && (
              <img
                src={housing.picture[0].path}
                alt={`image du logement ${housing.name}`}
                className=" w-full h-[68vh] object-cover"
              />
            )}
            {housing.picture.length > 1 && (
              <Slider page="housing" data={housing}></Slider>
            )}
            <div className="flex justify-between flex-wrap flex-col sm:flex-row items-start text-secondary-light p-2 sm:mx-8  ">
              <Link to="#rates_anchor" className="my-auto" reloadDocument>
              {averageStar > 0 && (
                <div className=" flex  text-2xl lg:text-3xl text-yellow-200">
                  {averageStar == 1 && (
                    <div className=" flex gap-0.5 ">
                      <AiFillStar /> <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                    </div>
                  )}
                  {averageStar == 2 && (
                    <div className=" flex gap-0.5 ">
                      <AiFillStar /> <AiFillStar /> <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                    </div>
                  )}
                  {averageStar == 3 && (
                    <div className=" flex gap-0.5 ">
                      <AiFillStar /> <AiFillStar /> <AiFillStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                    </div>
                  )}
                  {averageStar == 4 && (
                    <div className=" flex gap-0.5 ">
                      <AiFillStar /> <AiFillStar /> <AiFillStar />
                      <AiFillStar />
                      <AiOutlineStar />
                    </div>
                  )}
                  {averageStar == 5 && (
                    <div className=" flex gap-0.5 ">
                      <AiFillStar /> <AiFillStar /> <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                    </div>
                  )}
                </div>
              )}
              </Link>

              <p className="text-sm text-secondary-light md:text-md">
                <span className="text-terciary text-lg lg:text-2xl  lg:text-3xl">
                  {housing.price.toLocaleString()}
                </span>{" "}
                € la nuit / Voyageur
              </p>
              <div className="flex justify-around gap-2">
                <p className="flex gap-2 m-1 justify-center items-center text-xl lg:text-2xl">
                  <BsPerson className="text-terciary text-xl md:text-2xl  lg:text-3xl" />
                  {housing.nbrPersons}
                </p>
                <p className="flex gap-2 m-1 justify-center items-center text-xl lg:text-2xl">
                  <FaBed className="text-terciary text-xl md:text-2xl  lg:text-3xl" />
                  {housing.nbBed1}
                </p>
                <p className="flex gap-2 m-1 justify-center items-center text-xl lg:text-2xl">
                  <IoIosBed className="text-terciary text-xl md:text-2xl lg:text-3xl" />
                  {housing.nbBed2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
