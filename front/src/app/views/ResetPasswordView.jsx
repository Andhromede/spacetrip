import React from 'react';
import ResetPassword from '../components/account/ResetPassword';



const ResetPasswordView = (props) => {
    const { page } = props;
   

    return (
        <div className="lg:h-screen h-full bg-auth bg-no-repeat bg-cover" >
            {(page === "reset-password") &&
                <ResetPassword/>
            }

        </div>
    );
};

export default ResetPasswordView;