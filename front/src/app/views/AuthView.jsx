import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { URL_HOME } from '../constants/urls/urlFrontEnd';
import Login from '../components/account/Login';
import Register from '../components/account/Register';
import { selectIsLogged } from '../redux-store/authenticationSlice';



const LoginView = (props) => {
    const { page } = props;
    const navigate = useNavigate();
    let isAuthenticated = useSelector(selectIsLogged);

    useEffect(() => {
        if (isAuthenticated) navigate(URL_HOME);
    }, []);

    return (
        <div className="lg:mt-12 mt-10 flex lg:h-screen flex-col items-center justify-center bg-auth bg-no-repeat bg-cover" >
            {(page === "login") &&
                <Login/>
            }

            {(page === "register") &&
                <Register/>
            }
        </div>
    );
};

export default LoginView;
