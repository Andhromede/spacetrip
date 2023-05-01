import React from 'react';
import EmailValidate from '../components/account/EmailValidate';

const EmailValidateView = (props) => {
    const { page } = props;
   
    return (
        <div className="lg:h-screen h-full bg-validate-email bg-no-repeat bg-cover" >
            {(page === "validation-email") &&
                <EmailValidate/>
            }
        </div>
    );
};

export default EmailValidateView;
