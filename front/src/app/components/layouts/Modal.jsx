import { React } from "react";
import { BsXLg, BsPatchCheck } from "react-icons/bs";

export default function Modal({ open, onClose, textBtn, title, content }) {
  if (!open) return null;

  return (
    <div>
      {textBtn && <button onClick={open}>{textBtn}</button>}

      {open && (
        <div onClick={onClose} className="overlay h-full">
          <div
            role="alert"
            className="rounded-xl border border-gray-100 w-fit mt-20 p-4 mx-auto bg-black p-2"
          >
            <div className="flex items-start gap-4">
                <BsPatchCheck className="text-terciary self-center text-4xl "/>

              <div className="flex-1">
                <p className="block font-medium text-orange font-Varino">
                  {title}
                </p>

                <p className="mt-1 text-sm text-secondary-light">{content}</p>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 transition hover:text-gray-400 "
              >
                <span className="sr-only">Dismiss popup</span>

                <BsXLg />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
