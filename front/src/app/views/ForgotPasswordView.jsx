import React, { useEffect } from 'react';
import ForgotPassword from '../components/account/ForgotPassword';



const ForgotPasswordView = (props) => {
    const { page } = props;
   

    return (
        <div className="lg:h-screen h-full bg-auth bg-no-repeat bg-cover" >
            {(page === "forgot-password") &&
                <ForgotPassword/>
            }

        </div>
    );
};

export default ForgotPasswordView;