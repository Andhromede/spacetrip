import {
     URL_BACK_REGISTER, 
     URL_BACK_LOGIN,
     URL_BACK_VALIDATE_ACCOUNT,
     URL_BACK_FORGOT_PASSWORD,
     URL_BACK_RESET_PASSWORD
 } from '../../constants/urls/urlBackEnd';

import apiBackEnd from './api.Backend';

export function Register(values) {
    return apiBackEnd.post(URL_BACK_REGISTER, values);
}

export function Login(values) {
    return apiBackEnd.post(URL_BACK_LOGIN, values);
}

export function ValidateAccount(values) {
    return apiBackEnd.put(URL_BACK_VALIDATE_ACCOUNT, values);
}

export function Forgot_Password(values) {
    return apiBackEnd.put(URL_BACK_FORGOT_PASSWORD, values);
}

export function Reset_Password(values) {
    return apiBackEnd.put(URL_BACK_RESET_PASSWORD, values);
}
