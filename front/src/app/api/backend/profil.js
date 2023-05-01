import {
    URL_BACK_PROFIL,
    URL_BACK_UPD_PASSWORD,
    URL_BACK_GOOGLE_LOGIN,
    URL_BACK_UPD_EMAIL
}from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";


export function profilGet(id, token) {
    return apiBackEnd.get(URL_BACK_PROFIL + id, { headers: { "Authorization": `Bearer ${token}` } });
}

export function profilUpdate(values, id, token) {
    return apiBackEnd.put(URL_BACK_PROFIL + id, values, { headers: { "Authorization": `Bearer ${token}` } });
}

export function passwordUpdate(values, id, token) {
    return apiBackEnd.put(URL_BACK_UPD_PASSWORD + id, values, { headers: { "Authorization": `Bearer ${token}` } });
}

export function emailUpdate(values, id) {
    return apiBackEnd.put(URL_BACK_UPD_EMAIL + id, values);
}

export function googleLogin(values) {
    return apiBackEnd.post(URL_BACK_GOOGLE_LOGIN, values);
}

