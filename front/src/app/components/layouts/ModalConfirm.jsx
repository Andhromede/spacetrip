import {React, useState} from 'react'

const ModalConfirm = (open) => {7
    
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
      };

  return (
    <div>  
            {open && (
        <div onClick={handleOpen} className="overlay h-full">
          <div
            role="alert"
            className="rounded-xl border border-gray-100 w-fit mt-20 p-4 mx-auto bg-black p-2"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h2 className="block font-medium text-primary font-Varino">
                  Confirmation de suppression
                </h2>

                <p className="mt-1 text-sm text-center text-secondary-light py-4">
                  Souhaitez vous supprimer votre réservation ?
                </p>
                <div className="flex justify-around font-semibold">
                  {" "}
                  <button
                    onClick={handleOpen}
                    className="rounded-md p-1 bg-rose-400 "
                  >
                    <span>Annuler</span>
                  </button>
                  <button
                    onClick={handleClickDelete}
                    className="rounded-md p-1 bg-terciary "
                  >
                    <span>Confirmer</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleOpen}
                className="text-gray-500 transition hover:text-gray-400 "
              >
                <span className="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  )
}

export default ModalConfirm