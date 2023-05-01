import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Destination from "../components/layouts/Destination";
import { getDestination } from "../api/backend/destination";

const DestinationView = () => {
  const [destination, setDestination] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getDestination(id)
      .then((planetSelected) => {
        setDestination(planetSelected.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <div>
        <Destination key={destination._id} destinationSelected={destination} />
      </div>
    </div>
  );
};

export default DestinationView;
