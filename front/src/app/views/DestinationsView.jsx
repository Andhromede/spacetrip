import { React, useState, useEffect } from "react";
import { destinations } from "./../api/backend/destination";
import { Link } from "react-router-dom";

const Destinations = () => {
  const [tabDestinations, setTabDestinations] = useState([]);

  useEffect(() => {
    destinations()
      .then((res) => {
        if (res.status === 200) {
          setTabDestinations(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center md:text-start text-2xl md:text-4xl mb-10 font-Starjedi text-primary tracking-widest">
          Les planètes
        </h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {tabDestinations.map((planet) => {
           if (!planet.deleted) return (
              <Link
                key={planet._id}
                to={`/destination/${planet._id}`}
                className="group"
              >
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg  xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={planet.picture}
                    alt={"image de " + planet.name}
                    className="h-full w-full object-cover object-center opacity-85 hover:opacity-100"
                  />
                </div>
                <h3 className="flex justify-center mt-1 text-2xl font-medium title-jedi text-primary">
                  {planet.name}
                </h3>
                <p className="text-center mt-1 text-lg font-Varino text-terciary-light tracking-wide">
                  {planet.slogan}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
  );
};

export default Destinations;
