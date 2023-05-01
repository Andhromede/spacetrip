import { React } from "react";
import { capitalize, toBeautifyStringFr } from "../../constants/functions";
// Requete API
import { NewRate } from "./NewRate";
// Style & slider & icones
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "../../assets/styles/components/swiper.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsArrowDownCircleFill } from "react-icons/bs";


const Rates = ({ rates, housing }) => {

  return (
    <div>
      <div className="flex justify-center pb-2 "> <BsArrowDownCircleFill className="animate-bounce text-purple text-4xl"/></div>
      <section className=" bg-star-sky bg-no-repeat bg-cover bg-opacity-50">
        <div className=" p-4 sm:px-6 sm:py-24 lg:mr-0 lg:pl-8 lg:pr-0">
          <div className="max-w-7xl items-end justify-between sm:flex sm:pr-6 lg:pr-8">
            <h2 id="rates_anchor" className="text-secondary-light max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
              Les avis de nos clients
            </h2>
          </div>
          <div className="mt-8 mx-auto lg:col-span-2 lg:mx-0 ">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={50}
              slidesPerView="1"
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                768:{width: 768, slidesPerView:2},
                1048:{width: 1048, slidesPerView:3},
                1440: {width:1440, slidesPerView: 4}
              }}
            >
              <div className="mb-14 ">
                <p className="text-white">{rates[0].rate}</p>
                {rates.map((comment, index) => {
                  return (
                    // comment.isValable && (
                      <SwiperSlide
                      key={comment._id}
                      virtualIndex={index}
                      className="bg-black mb-12 "
                    >
                      <blockquote className="flex h-full flex-col justify-between p-8 min-h-[270px]">
                        <div className="text-quaternary">
                          <div className="text-2xl">
                            {comment.rate == 0 && <div className="flex gap-0.5 "><AiOutlineStar /> <AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></div>}
                            {comment.rate == 1 && <div className=" flex gap-0.5 "><AiFillStar /> <AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></div>}
                            {comment.rate == 2 && <div className=" flex gap-0.5 "><AiFillStar /> <AiFillStar /> <AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></div>}
                            {comment.rate == 3 && <div className=" flex gap-0.5 "><AiFillStar /> <AiFillStar /> <AiFillStar /><AiOutlineStar /><AiOutlineStar /></div>}
                            {comment.rate == 4 && <div className=" flex gap-0.5 "><AiFillStar /> <AiFillStar /> <AiFillStar /><AiFillStar /><AiOutlineStar /></div>}
                            {comment.rate == 5 && <div className=" flex gap-0.5 "><AiFillStar /> <AiFillStar /> <AiFillStar /><AiFillStar /><AiFillStar /></div>}
                          </div>
                          <div className="mt-4">
                            {comment.title ? (
                              <h3 className="text-2xl font-bold text-terciary sm:text-3xl">
                                {" "}
                                {comment.title}{" "}
                              </h3>
                            ) : (
                              " "
                            )}
                            <p className="mt-4 text-lg text-secondary-light">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                        <footer className="mt-8 text-secondary-light text-sm">
                          {comment.rateDate? <p className="text-xs">Posté le <span className="font-semibold text-terciary">{ toBeautifyStringFr(new Date(comment.rateDate))}</span></p> : " " }
                          {comment.user?.firstName ? "- "+ capitalize(comment.user.firstName) : "- Anonyme"}
                        </footer>
                      </blockquote>
                    </SwiperSlide>
                    )
                  // );
                })}
              </div>
            </Swiper>
            {housing._id && <NewRate housing={housing}/>} 
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rates;
