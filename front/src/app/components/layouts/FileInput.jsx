import { React } from "react";
import { Field } from "formik";


const FileInput = () => {
   
    return (
        <div className="flex items-center justify-center w-full mb-10">
            <label htmlFor="picture" className="flex flex-col items-center justify-center  h-26 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>

                    <div className="mb-2 text-sm text-gray-500 text-gray-400">
                    <span className="font-semibold">Cliquez ici </span>
                                                <span> pour selectionner une image</span>
                    </div>

                    <div className="text-xs text-gray-500 text-gray-400">JPEG, JPG ou PNG</div>
                </div>

                <Field id="picture" type="file" className="hidden" name="picture" value="" />
            </label>
        </div>
    );
};

export default FileInput;














