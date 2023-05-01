import { React, useState } from "react";
import Calendar from "react-calendar";
import "../../assets/styles/components/calendar.css";
import { Button } from "@material-tailwind/react";

export default function DateCalendar({ btnText, open, submit, setSelectedDate, selectedDate }) {
   // const [selectedDate, setDate] = useState(new Date());

   return (
      <div className="app">

         {open && (
            <div className="flex justify-center flex-col">
               <div className="calendar-container mx-auto">
                  <Calendar onChange={setSelectedDate} selectRange={true} minDate={new Date()} className="rounded-md "/>
               </div>

               {selectedDate.length > 0 ? (
                  <p className="text-center text-purple py-2">
                     <span className="bold text-white">Du</span>{" "}

                     <strong className="font-semibold">{selectedDate[0].toLocaleDateString()}</strong>

                     <span className="bold text-white"> au</span>{" "}

                     <strong className="font-semibold">{selectedDate[1].toLocaleDateString()}</strong>
                  </p>

               ):(

                  <p className="text-center py-2 text-white">
                     <span>Date du jour :</span>{" "}

                     <strong className="text-purple font-semibold">{selectedDate.toLocaleDateString()}</strong>
                  </p>
               )}

               {btnText && (
                  <div className="text-center">
                     <Button className=" text-secondary-light hover:bg-gradient-to-tr from-[#9001DB] to-[#160045]" variant="outlined" onClick={submit}>
                        {btnText}
                     </Button>
                  </div>
               )}
            </div>
         )}

      </div>
   );
}
