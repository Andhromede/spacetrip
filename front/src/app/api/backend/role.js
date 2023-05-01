import { URL_BACK_ROLES } from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";



export function getRoles() {
  return apiBackEnd.get(URL_BACK_ROLES );
}

export function updateRole(id, values, token) {
  return apiBackEnd.put(URL_BACK_ROLES + id, values , {headers: {"Authorization" : `Bearer ${token}`}});
}

export function insertRole(values, token) {
  return apiBackEnd.post(URL_BACK_ROLES, values , {headers: {"Authorization" : `Bearer ${token}`}});
}
