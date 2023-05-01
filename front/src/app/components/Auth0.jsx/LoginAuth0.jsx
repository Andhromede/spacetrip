import {GoogleLogin} from 'react-google-login';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {googleLogin} from '../../api/backend/profil'
import { useDispatch } from "react-redux";
import { signIn } from "../../redux-store/authenticationSlice";
import { URL_HOME } from "../../constants/urls/urlFrontEnd";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() =>{
        function start(){
          gapi.auth2.init({
            clientId:import.meta.env.VITE_APP_CLIENT_ID,
            scope:""
          })
        };
        gapi.load('client:auth2', start);
      })

    const onSuccess = (res) =>{    
      // navigate("/destination");
        console.log( 1,"Connexion réussi ! Utilisateur:", res);
        googleLogin({tokenId:res.tokenId})
       .then(res=> {
            console.log(2,"connection google réussi", res);
            if (res.status === 201 && res.data.token) {
              dispatch(signIn(res.data.token));
             navigate(URL_HOME); 
            }
        })
    }

    const onFailure = (res) =>{
        console.log("connexion échouée ! res:", res);
    }

    return(
    <div className="signInButton mt-10 ml-2 ">
        <GoogleLogin 
            className='w-[105px] !bg-rose-400  !rounded-lg'
            clientId={import.meta.env.VITE_APP_CLIENT_ID}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />     
    </div>
    )
}
export default Login;

