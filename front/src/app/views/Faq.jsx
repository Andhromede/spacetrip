import { React, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import ImageFaq from "../assets/images/general/imageFaq.png";

const Faq = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  return (
    <>
      <div>
        <img className="w-screen h-[500px] mx-auto object-cover rounded-b-xl" src={ImageFaq} alt=""/>
      </div>

      <h1 className="mx-auto py-10 text-center">
        <div className="text-6xl title-jedi text-primary">f.a.q</div>
        <div className="text-lg mt-3 font-Typewriter text-white">Foire Aux Questions </div>
      </h1>
      <div className="mt-[50px] mb-[150px] mx-40 text-white border p-10 rounded-xl bg-[#082863] shadow-slate-600 shadow-md">
        <Accordion open={open === 1} animate={customAnimation}>
          <AccordionHeader onClick={() => handleOpen(1)} className="font-bold text-2xl"> Comment payer ma commande ? </AccordionHeader>
          <AccordionBody className="py-500 text-white font-Typewriter text-md">
            <p className="py-2">
              Nous offrons plusieurs options de paiement très simple et sécurisés :
            </p>

            <p>1. Carte de crédit</p>
            <p>2. PayPal</p>
            <p>3. Financement Sofinco</p>
            <p>4. Carte-cadeau</p>
          </AccordionBody>
        </Accordion>

        <Accordion open={open === 2} animate={customAnimation}>
          <AccordionHeader onClick={() => handleOpen(2)} className="font-bold text-2xl"> Annulation et remboursements </AccordionHeader>
          <AccordionBody className="pt-2 text-white font-Typewriter text-md">
            Veuillez nous contacter pour toute modification de commande ou
            demande d'annulation. Nos processus ont été optimisés pour que votre
            commande soit complétée le plus rapidement possible, ce qui signifie
            que votre commande peut être plus avancée dans le processus que vous
            ne le pensez.
          </AccordionBody>
        </Accordion>

        <Accordion open={open === 3} animate={customAnimation}>
          <AccordionHeader onClick={() => handleOpen(3)} className="font-bold text-2xl">  Proposez-vous un financement ? </AccordionHeader>
          <AccordionBody  className="pt-2 text-white font-Typewriter text-md">
            Oui, nous le faisons, en nous associant à Sofinco, nous proposons
            désormais des options de paiement mensuel fixe avec des taux
            d'intérêt annuels allant de 10 à 30 % (sous réserve de l'approbation
            du crédit). Trouvez simplement le voyage que vous souhaitez
            acheter sur notre site Web et cliquez sur Paiements mensuels et vous
            pourrez  directement avec Sofinco. Ils sont en mesure de
            fournir une décision de crédit en quelques secondes et s'ils sont
            approuvés, vous fourniront tous les détails dont vous aurez besoin
            pour décider si le prêt vous convient.
          </AccordionBody>
        </Accordion>
      </div>
    </>
  );
};

export default Faq;
