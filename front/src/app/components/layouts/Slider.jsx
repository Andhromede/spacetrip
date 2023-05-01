import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { CardHeader } from "@material-tailwind/react";

const Slider = ({ data, page }) => {
  return (
    <>
      {page == "home" && (
        <Carousel
          autoPlay
          interval={6000}
          infiniteLoop
          thumbWidth={100}
          showStatus={false}
          showIndicators={false}
          useKeyboardArrows={true}
        >
          {data.map((slide) => {
            // console.log(slide.deleted);
           if (!slide.deleted) return (
              <div key={slide._id}>
                <h2 className="title-jedi text-primary text-xl">{slide.name}</h2>
                <p className="text-white px-20 my-8">{slide.description}</p>
                {/* <div className="w-[60%] h-[500px] ml-auto mr-auto"> */}
                  {Array.isArray(slide.picture) && slide.picture[0] ? (
                    <img
                      src={slide.picture[0].path}
                      alt={`image de ${slide.name}`}
                      className="h-full w-full object-contain object-center lg:h-full lg:w-full rounded-xl"
                    />
                  ) : (
                    <img
                      className="h-full w-full object-contain rounded-xl object-center lg:h-full lg:w-full rounded-xl"
                      src={slide.picture}
                      alt={"image de " + slide.name}
                    />
                  )}
                {/* </div> */}
              </div>
            );
          })}
        </Carousel>
      )}

      {page == "housing" && (
        <Carousel
          autoPlay
          interval={3000}
          infiniteLoop
          showStatus={false}
          showThumbs={false}
        >
          {data.picture.map((item) => {
            return (
              <CardHeader
                className=" relative h-[70vh]"
                children="Card"
                key={item._id}
              >
                <img
                  src={item.path}
                  alt="test"
                  className="h-full w-full object-center object-contain bg-black"
                />
              </CardHeader>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default Slider;
