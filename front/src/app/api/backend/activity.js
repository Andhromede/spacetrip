import { URL_BACK_ACTIVITY } from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";


export function getActivity() {
  return apiBackEnd.get(URL_BACK_ACTIVITY );
}

export function updateActivity(id, values, token) {
  return apiBackEnd.put(URL_BACK_ACTIVITY + id, values, {headers: {"Authorization" : `Bearer ${token}`}}  );
}

export function postActivity(values, token) {
  return apiBackEnd.post(URL_BACK_ACTIVITY, values, {headers: {"Authorization" : `Bearer ${token}`}} );
}
