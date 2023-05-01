import React, { useState, useEffect } from "react";
import { destinations } from "../api/backend/destination";
import { getActivity } from "../api/backend/activity";
import Activity from "../components/layouts/Activity";
import { getAllHousings, getHousingByDestination } from "../api/backend/housing";
import "../assets/styles/components/filter.css";
import HousingDetail from "../components/layouts/HousingDetail";
import { Link } from "react-router-dom";

const SearchFilterView = () => {
  // useState Destination
  const [destination, setDestination] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterPlanet, setFilterPlanet] = useState("");

  // useState Activité
  const [activity, setActivity] = useState([]);
  const [filteredResultsA, setFilteredResultsA] = useState([]);
  const [filterActivity, setFilterActivity] = useState("");

  // useState Logement
  // const [housings, setHousings] = useState([]);
  const [housing, setHousing] = useState([]);
  const [filteredResultsHousing, setFilteredResultsHousing] = useState([]);
  const [filterHousing, setFilterHousing] = useState("");

  useEffect(() => {
    destinations()
      .then((res) => {
        if (res.status === 200) {
          setDestination(res.data);
        }
      })
      .catch((err) => console.log(err));

      // if (id_planet) {
      //   getHousingByDestination(id_planet)
      //     .then((housingsSelected) => {
      //       setHousings(housingsSelected.data);
      //     })
      //     .catch((err) => console.log(err));
      // }

    getActivity()
      .then((res) => {
        if (res.status === 200) {
          setActivity(res.data);
        }
      })
      .catch((err) => console.log(err));
    getAllHousings()
      .then((res) => {
        if (res.status === 200) {
          setHousing(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //Function Select Destination
  const searchItems = (searchValue) => {
    setFilterActivity([]);
    setFilterHousing([]);
    setMaxPrice(1400);
    setMinPrice(0);
    document.getElementById("selectActivity").selectedIndex = "0";
    document.getElementById("selectHousing").selectedIndex = "0";
    setFilterPlanet(searchValue);
    if (filterPlanet === filterPlanet) {
      const filteredData = destination.filter((item) => {
        return Object.values(item).includes(searchValue);
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(destination);
    }
  };

  //Function Select Activité
  const searchItemsActivity = (searchValue) => {
    setFilterPlanet([]);
    setFilterHousing([]);
    setMaxPrice(1400);
    setMinPrice(0);
    document.getElementById("selectDestination").selectedIndex = "0";
    document.getElementById("selectHousing").selectedIndex = "0";
    setFilterActivity(searchValue);
    if (filterActivity === filterActivity) {
      const filteredData = activity.filter((item) => {
        return Object.values(item).includes(searchValue);
      });
      setFilteredResultsA(filteredData);
    } else {
      setFilteredResultsA(activity);
    }
  };

  //Function Select Housing
  const searchItemsHousing = (searchValue) => {
    setFilterPlanet([]);
    setFilterActivity([]);
    setMaxPrice(1400);
    setMinPrice(0);

    document.getElementById("selectDestination").selectedIndex = "0";
    document.getElementById("selectActivity").selectedIndex = "0";
    setFilterHousing(searchValue);
    if (filterHousing === filterHousing) {
      const filteredData = housing.filter((item) => {
        return Object.values(item).includes(searchValue);
      });
      setFilteredResultsHousing(filteredData);
    } else {
      setFilteredResultsHousing(housing);
    }
  };

  // Input type range
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1400);

  const range = document.querySelectorAll(".range-slider input");
  let progress = document.querySelector(".range-slider .progress");
  let gap = 1000;
  const inputValue = document.querySelectorAll(".numberVal input");

  range.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(range[0].value),
        maxPrice = parseInt(range[1].value);

      if (maxPrice - minPrice < gap) {
        if (e.target.className === "range-min") {
          range[0].value = maxPrice - gap;
        } else {
          range[1].value = minPrice + gap;
        }
      } else {
        (document.getElementById("selectActivity").selectedIndex = "0"),
          (document.getElementById("selectDestination").selectedIndex = "0"),
          (document.getElementById("selectHousing").selectedIndex = "0"),
          (progress.style.left = (minPrice / range[0].max) * 95 + "%");
        progress.style.right = 100 - (maxPrice / range[1].max) * 95 + "%";
        inputValue[0].value = minPrice;
        inputValue[1].value = maxPrice;
      }
    });
  });

  return (
    <div className="">
      <div className="bg-zinc-800 flex flex-col items-center">
        <div className=" xl:mt-24 text-center sm:mt-10">
          <h2 className="text-terciary font-Starjedi xl:text-[3rem] sm:text-[15px]">
            Filtre de recherche
          </h2>
        </div>

        {/* Select Destination */}
        <div className="p-5 mx-8 bg-slate-400 bg-opacity-50 rounded-[10px] flex space-x-8 mt-20 justify-center items-center">
          <div>
            <select
              onChange={(e) => searchItems(e.target.value)}
              className="w-[11rem] bg-quaternary-light rounded-[20px] text-xs font-Varino font-extrabold"
              id="selectDestination"
            >
              <option value="Select" id="select" className="">
                Destination
              </option>

              {destination.map((item) => {
                return (
                  <option
                    key={item._id}
                    value={item._id}
                    className="bg-secondary-light "
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Select Activités */}
          <div>
            <select
              onChange={(e) => searchItemsActivity(e.target.value)}
              className="w-[10rem] bg-quaternary-light rounded-[20px] text-xs font-Varino font-extrabold"
              id="selectActivity"
            >
              <option value="Select" >
                Activités
              </option>

              {activity.map((item) => {
                return (
                  <option
                  id="activity-option"
                    key={item._id}
                    value={item._id}
                    className="bg-secondary-light"
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Select Housing */}
          <div>
            <select
              onChange={(e) => searchItemsHousing(e.target.value)}
              className="w-[10rem] bg-quaternary-light rounded-[20px] text-xs font-Varino font-extrabold"
              id="selectHousing"
            >
              <option value="Select">Logements</option>

              {housing.map((item) => {
                return (
                  <option
                    key={item._id}
                    value={item._id}
                    className="bg-secondary-light"
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input Price Housing */}
          <div className="container-range bg-zinc-500">
            <div className="min-value numberVal">
              <input
                type="number"
                min={50}
                max={10000}
                value={minPrice}
                disabled
                className="bg-quaternary-light"
              />
            </div>
            <span className="p-3">Min</span>

            <div className="range-slider">
              <div className="progress"></div>
              <input
                className="range-min"
                min={0}
                max={10000}
                type="range"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.valueAsNumber),
                    setFilterPlanet([]),
                    setFilterActivity([]),
                    setFilterHousing([]);
                }}
              />
              <input
                className="range-max "
                type="range"
                min={0}
                max={10000}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.valueAsNumber),
                    setFilterPlanet([]),
                    setFilterActivity([]),
                    setFilterHousing([]);
                }}
              />
            </div>
            <span className="p-3">Max</span>
            <div className="max-value numberVal">
              <input
                className="bg-quaternary-light"
                type="number"
                min={0}
                max={10000}
                value={maxPrice}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Resultat Price */}
        <div className="w-[1400px] mx-auto flex flex-wrap" id="resultPrice">
          {housing.map((item) => {
            return (
              item.price >= minPrice &&
              item.price <= maxPrice && (
                <div className="rowPrice flex justify-center columns-2 m-5">
                  <div
                    className="h-[450px] w-[400px] bg-black mb-20 text-center mr-5 mt-20 font-bold border-2  border-[#fff] rounded-[15px]
                  transition ease-in-out delay-300 hover:-translate-y-1 hover:scale-105 hover:bg-opacity-50
                    duration-500"
                  >
                    <h2 className="text-primary text-xl my-5 font-Starjedi">
                      {item.name}
                    </h2>
                    <img
                      src={`../src/app/${item.picture[0].path}`}
                      alt={"image de " + item.name}
                      className="h-[150px] w-[230px] rounded-[10px] object-cover object-center mx-auto"
                    />
                    <p className=" text-[#fff] pb-7 text-center mx-auto mt-5">
                      {item.description.substring(0, 125) + "..."}
                    </p>
                    <p className="text-xl text-primary font-bold mb-5">
                      Prix : {item.price} €
                    </p>

                    <Link
                      to={`/destination/${item.destination._id}`}
                      key={item._id}
                      className="bg-terciary  p-2 rounded-[10px] "
                    >
                      Voir les disponibilités
                    </Link>
                  </div>
                </div>
              )
            );
          })}
        </div>

        {/* Résultat Destination */}
        {filterPlanet.length > 1 &&
          filteredResults.map((item) => {
            return (
              // console.log(filteredResults)
              <div
                id="resultDestination"
                className=" flex justify-center flex-col justify-center items-center mt-20"
              >
                <h2 className="text-center text-5xl font-Starjedi text-primary tracking-widest">
                  {item.name}
                </h2>
                {}
                <div className="border-b-2 w-full  ">
                  <div className="ml-auto mr-auto w-[20%] flex justify-center items-center w-full overflow-hidden rounded-lg">
                    <img
                      src={`../../src/${item.picture}`}
                      alt={"image de " + item.name}
                      className="h-full w-full object-cover object-center "
                    />
                  </div>
                  <h3 className="text-center mt-4 text-3xl font-Varino text-terciary hover:text-terciary-light tracking-wide">
                    {item.slogan}
                  </h3>
                  <p className=" text-center m-10 text-xl font-Typewriter text-secondary-light tracking-wider">
                    {item.description}
                  </p>
                </div>

                {item.activity.length >= 1 && (
                  <div>
                    {" "}
                    <p className="text-center text-1xl font-Starjedi text-primary tracking-widest mt-10 mb-5">
                      voici les activités disponibles sur {item.name}
                    </p>
                    <div className="grid grid-cols-8 gap-2">
                      <div className="flex justify-center mb-[100px] col-start-2 col-span-6">
                        {item.activity.map((item) => {
                          return (
                            <Activity key={activity._id} activity={item} />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        {/* Résultat Activités */}
        {filterActivity.length > 0 &&
          filteredResultsA.map((item) => {
            return (
              <div className=" ">
                <div
                  id="resultActivity"
                  className="  flex flex-col items-center"
                  name="activity"
                >
                  <h2 className="text-center text-xl font-Starjedi text-primary tracking-widest mt-10">
                    Nos activités
                  </h2>
                  <div
                    className=" h-[570px] w-[800px] text-center font-bold  
                  transition ease-in-out delay-300 hover:-translate-y-1 hover:scale-105 hover:bg-opacity-50
                    duration-500 flex justify-center"
                  >
                    <Activity key={activity._id} activity={item} />
                  </div>

                  <div className="mb-[60px] flex">
                    <p className="text-center text-1xl font-Starjedi text-primary tracking-widest ">
                      Activité disponible sur{" "}
                      {item.destination.length == 1
                        ? "  "
                        : "les planètes : "}
                    </p>
                    {item.destination.map((destination) => {
                      return (
                        <div className="">
                          <p className="text-primary text-xl flex flex-wrap mr-2 justify-center text-center flex flex-col">
                             : {destination.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

        {/* Résultat Logement */}
        {filterHousing.length > 0 &&
          filteredResultsHousing.map((item) => {
            return (
              <div
                id="resultHousing"
                name="housing"
                className=" mx-auto"
              >
                <HousingDetail key={housing._id} housing={item}/>
                      {item.destination.length > 1 ? (
                        <div className="mb-[40px] flex mt-5 ">
                          <p className="text-center text-1xl font-Starjedi text-primary tracking-widest ">
                            Ce Logement est disponible sur :
                          </p>
                          {item.destination.map((destination) => {
                            return (
                              <p className="px-[2px] text-primary text-xl flex flex-wrap justify-center">
                                {destination.name}
                              </p>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="mt-2 text-center text-xl font-Starjedi text-primary tracking-widest mr-5">
                          Ce Logement est disponible sur{" "}
                          {item.destination.name}
                        </p>
                      )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default SearchFilterView;
