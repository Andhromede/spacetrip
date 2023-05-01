import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../../assets/styles/components/carrousel.css";
import { Link } from "react-router-dom";

const CarrouselPicture = ({ data }) => {
  return (
    <Carousel
    autoPlay
    interval={6000}
    infiniteLoop
    showStatus={false}
    showIndicators={false}
    >
      {data.map((slide) => {
        // console.log(slide.deleted);
        if (!slide.deleted)
          return (
            <div key={slide._id}>
              <div className="overlay">
                {/* <Link to={`/destination/${slide._id}`}> */}
                  <h2 className="overlay__title title-jedi text-primary text-xl">
                    {slide.name}
                  </h2>
                {/* </Link> */}
                <p className="overlay__text text-white">
                  {slide.description}
                </p>
              </div>
              {/* <div className="w-[60%] h-[500px] ml-auto mr-auto"> */}
                {/* {Array.isArray(slide.picture) && slide.picture[0] ? (
                  <img
                    src={slide.picture[0].path}
                    alt={`image de ${slide.name}`}
                    className="h-full w-full object-contain object-center lg:h-full lg:w-full rounded-xl"
                  />
                ) : ( */}
                  <img
                    className=""
                    src={slide.picture}
                    alt={"image de " + slide.name}
                  />
                {/* )} */}
              {/* </div> */}
            </div>
          );
      })}
    </Carousel>
  );
};

export default CarrouselPicture;
