import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Auth0.jsx/LogoutAuth0';
import { URL_ABOUT_US, URL_HOME, URL_MENTIONS, URL_FAQ, URL_CONTACT } from '../../constants/urls/urlFrontEnd';

const Footer = () => {

    return (
        <>
         {/* <Logout/>  */}
            <section className="p-4 shadow bg-zinc-900 font-Varino opacity-90 text-[12px] mt-auto">
                <div className="mx-auto overflow-hidden text-white">
                
                    <nav className="flex flex-wrap justify-center">
                        <div className="">
                            <Link to={URL_FAQ} className="mr-4 md:mr-6 md:hover:text-rose-300 md:hover:bg-transparent">FAQ</Link>
                        </div>
  
                        <div className="">
                            <Link to={URL_HOME} className="mr-4 md:mr-6 md:hover:text-rose-300 md:hover:bg-transparent">Aide</Link>
                        </div>

                        <div className="">
                            <Link to={URL_CONTACT} className="mr-4 md:mr-6 md:hover:text-rose-300 md:hover:bg-transparent">Contact</Link>
                        </div>

                        <div className="">
                            <Link to={URL_ABOUT_US} className="mr-4 md:mr-6 md:hover:text-rose-300 md:hover:bg-transparent">Qui sommes nous ?</Link>
                        </div>

                        <div className="">
                            <Link to={URL_MENTIONS} className="mr-4 md:mr-6 md:hover:text-rose-300 md:hover:bg-transparent">Mentions légales</Link>
                        </div>
                    </nav>
                </div>
            </section>
            
        </>
    );
};

export default Footer;
