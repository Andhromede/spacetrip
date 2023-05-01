import React from "react";
import Image from "../assets/images/general/003.png";
import Image4 from "../assets/images/general/004.png";
import Image5 from "../assets/images/general/005.png";
import Image6 from "../assets/images/general/006.png";
import Image7 from "../assets/images/general/007.png";
import logofb from "../assets/images/general/logofb.png";
import logoinsta from "../assets/images/general/logoinsta.png";
import logotwitter from "../assets/images/general/logotwitter.png";

const AboutUs = () => {
   return (
      <main className="bg-zinc-800 text-white text-justify ">
         <h1 className="my-12 sm:mb-10 sm:mt-20 title-jedi text-center text-4xl text-rose-300">qui sommes nous ?</h1>

         <img className="mx-auto rounded-lg object-cover h-96 shadow-xl shadow-pink-300 w-full" src={Image} alt="" />

         <div className="flex w-[90%] md:w-[80%] mx-auto mt-20 flex-col font-Typewriter mb-10 text-[16px] tracking-wider">
            <div className="my-2">
               <strong>SpaceTrip</strong> est une agence de voyage spatial interplanétaire. Nous
               transportons les voyageurs à travers l'espace, au confins des astres
               les plus inaccessibles mais toujours plus extraordinaires.
            </div>

            <div className="my-2 ">
               Créer par des astrophysiciens et astronautes passionés, SpaceTrip
               veille à promouvoir le voyage inteplanétaire à travers la découverte
               de nouveaux monde ainsi que la transmission de cette science qu'est
               l'astronomie: Voici les valeurs que nous véhiculons !
            </div>

            <h2 className="mt-12 text-rose-300 text-2xl title-jedi text-center">Notre Parcours</h2>

            <div className="my-5 ">
               Depuis le début du 21e siècle, le voyage interplanétaire évolue
               lentement mais sûrement. Nos astrophysiciens <strong>Nath.G</strong>, <strong>Karim.M</strong> et 
               <strong> Guillaume.B</strong> ont enfin percé les mystères des trous noirs afin de
               les exploiter telle des passerelles. Ils nous permettent de circuler
               d'un système galactique à une autre. Nos dernières découvertes nous
               autorisent à créer des portails simulant des trous noirs ce qui
               ne nécessite donc pas l'utilisation d'un astronef.
            </div>

            <div className="my-2">
               Nos Ingénieurs Pilotes <strong>Trystan.D</strong> et <strong>Mickaël.D</strong>, anciens astronautes de
               la NASA, vous accompagneront tout au long de votre voyage afin qu'il
               se déroule en toute sécurité.
            </div>
         </div>

         <div className="flex flex-wrap justify-between w-full gap-x-5">
            <img className="rounded-l-lg md:w-[48%] w-full max-w-screen-md shadow-[0_10px_10px_0px_rgba(133,77,14,0.3)]" src={Image4} alt="" />
            <img className="rounded-r-lg md:w-[48%] w-full max-w-screen-md shadow-[0_10px_20px_0px_rgba(20,83,14,0.3)] " src={Image6} alt="" />
         </div>
         <div className="mt-8 font-Ananda text-center text-2xl text-terciary-light tracking-wider">
            « Ils ne savaient pas que c'était impossible, alors ils l'ont fait ! » 
            </div>
            <p className="font-serif text-center mt-2 ">Mark Twain</p>

         <div className="my-10 flex flex-wrap justify-between gap-x-5">
            <img className="rounded-l-lg md:w-[48%] w-full max-w-screen-md shadow-[0_10px_20px_0px_rgba(55,65,81,0.5)]" src={Image7} alt="" />
            <img className="rounded-r-lg md:w-[48%] w-full max-w-screen-md shadow-[0_10px_20px_0px_rgba(180,83,9,0.3)]" src={Image5} alt="" />
         </div>

         <div className="flex mt-10 flex-col font-Typewriter text-[16px] tracking-wider">
            <h2 className="my-8 text-rose-300 text-2xl title-jedi text-center">Rencontre du 3<span className="text-lg">eme</span> type ?</h2>

            <div className="w-[85%] sm:w-[70%] mx-auto">
               Cette question vous traverse l'esprit n'est-ce pas ? En effet, des populations demeurent dans ces différentes contrées. Leurs moeurs et coutumes ne ressemblent en rien à ce que nous connaissons ici.
            </div>

            <div className="mt-8 w-[85%] sm:w-[70%] mx-auto">
            <strong>Caroline.S</strong>, diplomate et Docteure en gestion globale et développement international, s'assure de la qualité des échanges entre les différentes populations afin de garantir toujours plus de sérénité lors de votre séjour.
            </div>

            <p className="mt-12 font-Ananda text-center text-2xl text-terciary tracking-wider">
            « N’hésitez jamais à partir loin, au-delà de toutes les mers, toutes les frontières, tous les pays, toutes les croyances. »  
            </p>
            <p className="font-serif text-center mt-2 ">Amin Maalouf</p>

            <h3 className="my-10 text-center">Alors, qu'attendez-vous ?</h3>
         </div>

         <h3 className="my-8 text-rose-300 text-2xl title-jedi text-center">Suivez-nous</h3>

         <div className="flex justify-evenly mb-12">
            <a href="https://www.facebook.com/" target="_blank"><img className="h-28 w-28" src={logofb} alt=""/></a>
            <a href="https://www.instagram.com/?hl=fr" target="_blank"><img className="h-28 w-28" src={logoinsta} alt=""/></a>
            <a href="https://twitter.com/?lang=fr" target="_blank"><img className="h-28 w-28" src={logotwitter} alt=""/></a>
         </div>
      </main>
   );
};

export default AboutUs;
