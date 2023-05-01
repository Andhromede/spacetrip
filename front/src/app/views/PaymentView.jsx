import { React, useState } from "react";
import LogoSpaceTrip from "../assets/images/general/logo2.png";
import { BsFillPersonFill } from "react-icons/bs"
import { productsInBasket } from '../redux-store/basketSlice';
import { useSelector, useDispatch, } from 'react-redux';

import { FaTrashAlt } from 'react-icons/fa';
import SolarSystem from '../components/layouts/SolarSystem';
import FormPayment from "../components/layouts/PaymentForm";


const PaymentView = () => {
   const tabProducts = useSelector(productsInBasket);
   const dispatch = useDispatch();
   let totalPrice = 0;

   return (
      <>
         <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto">
               {/* TITRE PAGE */}
               <h2 className="text-[2.5em] font-Starjedi text-primary tracking-widest text-center">paiement</h2>

               <div className="text-white font-medium text-xl font-Typewriter mt-20 text-white text-center">
                  <div>Nos voyages prestiges exigent que tous les renseignements vous concernant soient scrupuleusement vérifiés.</div>
                  <div>Aucun paiement, remboursement, annulation ou report ne pourra être effectué si les informations communiquées sont erronées.</div>
               </div>

               <section className="mt-8">
                  <div className="relative mx-auto max-w-screen-2xl">
                     <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="bg-black py-12 md:py-24 border-zinc-400 border-2 text-white">
                           <div className="mx-auto max-w-lg px-4 lg:px-8">
                              {/* <SolarSystem /> */}

                              {/* LOGO + TITRE */}
                              <div className="flex items-center">
                                 <img className="h-8 w-auto cursor-pointer sm:h-20" src={LogoSpaceTrip} alt="logo spaceTrip" />
                                 <h1 className="ml-4 font-medium text-5xl title-jedi">SpaceTrip</h1>
                              </div>

                              <div className="mt-12">
                                 <div className="flow-root">
                                    <ul className="-my-4 divide-y divide-gray-200">

                                       {/* ARTICLES IN BASKET*/}
                                       {tabProducts.map((item) => {
                                          totalPrice += item.totalPrice;

                                          return (
                                             <li className="flex items-center justify-between py-4" key={item._id}>
                                                <div className="flex items-start">
                                                   <img alt="Trainer" className="h-16 w-16 flex-shrink-0 rounded-lg object-cover font-Typewriter" src={`./src/app/${item.picture[0].path}`} />

                                                   <div className="ml-4">
                                                      <div className="-my-5 ">
                                                         <div className="flex items-center justify-between py-4 ">
                                                            <div className="flex items-start">
                                                               <div className="">
                                                                  <div className="font-Starjedi text-primary mr-5 text-md tracking-wider">{item.destination.name}</div>
                                                               </div>
                                                            </div>
                                                         </div>
                                                      </div>

                                                      <div className="text-md flex">
                                                         <div className="inline text-end font-bold mr-5 ">{item.name}</div>
                                                      </div>

                                                      <div className="mt-1 space-y-1 text-md text-gray-400">
                                                         <div className="inline">
                                                            <span className="">du </span>
                                                            <span className="text-white font-bold">{(new Date(item.startDate).toLocaleDateString())} </span>
                                                         </div>

                                                         <div className="inline">
                                                            <span className="">au </span>
                                                            <span className="text-white font-bold">{(new Date(item.endDate).toLocaleDateString())} </span>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>

                                                <div>
                                                   <div className="text-md font-bold">
                                                      <div className="flex inline text-white text-gray-400 text-sm text-end">
                                                         {item.quantity} <BsFillPersonFill className="ml-1 text-lg" />
                                                      </div>
                                                   </div>

                                                   <div className="text-md font-bold">
                                                   {(item.totalPrice).toLocaleString()} €
                                                   </div>
                                                </div>
                                             </li>
                                          );
                                       })}
                                    </ul>
                                 </div>
                              </div>

                              <div className="mt-20">
                                 <div className="flow-root">
                                    <ul className="-my-4 divide-y divide-gray-200">
                                       <li className="flex items-center justify-between py-4">
                                          <div className="flex items-start">
                                             <div className="ml-4">
                                                <div className="text-2xl font-medium tracking-tight">Montant TOTAL :</div>
                                             </div>
                                          </div>

                                          <div>
                                             <div className="text-2xl font-bold tracking-tight text-[#b94ee5]">
                                                {totalPrice &&
                                                   <> {totalPrice.toLocaleString()} € </>
                                                }
                                             </div>
                                          </div>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <FormPayment/>
                     </div>
                  </div>
               </section>
            </div>
         </section >
      </>
   );
};

export default PaymentView;
