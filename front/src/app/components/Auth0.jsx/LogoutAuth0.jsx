import {GoogleLogout} from 'react-google-login';
import { URL_HOME } from '../../constants/urls/urlFrontEnd';
import { useNavigate } from 'react-router-dom';



function Logout(){
    const navigate = useNavigate();

    const onSuccess = () =>{
        navigate("/about-us");
        console.log("Déconnexion réussi ! ");
    }

    return(
            <div className="signOutButton mt-2 ml-2">
                <GoogleLogout
                className='w-[105px] !bg-rose-400 !rounded-lg'
                clientId={import.meta.env.VITE_APP_CLIENT_ID}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
                // redirectUri={'http://localhost:5173/'}
                 redirectUri={URL_HOME} 
                />
            </div>

    )
}

export default Logout;