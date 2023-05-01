import { URL_BACK_USER, URL_BACK_PROFIL } from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function getUsers(token) {
  return apiBackEnd.get(URL_BACK_USER, {headers: {"Authorization" : `Bearer ${token}`}});
}

export function updateUser(id, values, token) {
  return apiBackEnd.put(URL_BACK_PROFIL + id, values, {headers: {"Authorization" : `Bearer ${token}`}});
}
