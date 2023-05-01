import React from "react";
import Slider from "../../components/layouts/Slider";

function Activity({ activity }) {
  if (activity.deleted ) return <div> </div>
  
  return (
    <div className="bg-black m-2 border-2 lg:w-[40%] sm:w-[50%]">
        <div className=" min-h-80 h-60 overflow-hidden scrollable-element opacity-85 lg:aspect-none md:h-80">
          {activity.picture.length == 1 &&
            activity.picture.map((picture) => {
              return (
                <img
                  key={picture._id}
                  src={picture.path}
                  alt={`image de ${activity.name}`}
                  className="bg-black h-full w-full object-cover object-center "
                />
              );
            })}
          {activity.picture.length > 1 && (
            <Slider page="housing" data={activity}></Slider>
          )}
        </div>
        <div className="p-4  flex flex-col justify-between text-secondary-light font-Typewriter tracking-wider">
          <div>
            <h3 className="mt-1 font-Varino text-lg text-primary">
              <span aria-hidden="true" className="text-center">
                {activity.name}
              </span>
            </h3>
            <p className="mt-1 text-sm mt-2 overflow-auto h-36 text-justify">
              {activity.description}
            </p>
          </div>
        </div>
    </div>
  );
}

export default Activity;
