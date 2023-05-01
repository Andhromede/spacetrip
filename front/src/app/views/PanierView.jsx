import { React } from "react";
import BasketCard from "../components/layouts/BasketCard";
import { URL_PAYMENT, URL_DESTINATIONS } from "../constants/urls/urlFrontEnd";
import { Link } from "react-router-dom";
import {productsInBasket} from "../redux-store/basketSlice";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {BsCartXFill} from "react-icons/bs"
import {GoArrowRight, GoArrowLeft} from "react-icons/go"

const PanierView = () => {
  const tabProducts = useSelector(productsInBasket);

  return (
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-2xl lg:text-4xl mb-10 title-jedi text-primary text-center">
            Mon panier
          </h1>

          <div className="flex flex-wrap m-4">
            {tabProducts.map((data) => {
              return <BasketCard item={data} key={data._id} />;
            })}
          </div>

          {tabProducts.length > 0 ? (
            <div className="flex justify-center">
              <Link to={URL_PAYMENT}>
                <button className="btn bg-rose-400 hover:bg-rose-300 w-80 py-2 px-4 rounded font-bold text-lg text-black mt-8">
                  Acceder au paiement
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <BsCartXFill className="mx-auto text-rose-400 text-8xl md:text-9xl"/>
              <Link
                className="font-Varino "
                to={URL_DESTINATIONS}
              >
                <div className="mt-20 text-sm md:text-2xl text-center flex justify-center text-terciary hover:text-terciary-light"><GoArrowRight className="mx-6 text-terciary-light text-3xl" /> Venez découvrir nos destinations <GoArrowLeft  className="mx-6 text-terciary-light text-3xl"/></div>
              </Link>
            </div>
          )}
        </div>
      <ToastContainer theme="dark" />
      </section>
  );
};

export default PanierView;
