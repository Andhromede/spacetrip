import { URL_BACK_DESTINATIONS} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";


export function destinations() {
  return apiBackEnd.get(URL_BACK_DESTINATIONS);
}

export function getDestination(id) {
  return apiBackEnd.get(URL_BACK_DESTINATIONS + id);
}

export function putDestination(id, values, token) {
  return apiBackEnd.put(URL_BACK_DESTINATIONS + id, values, {headers: {"Authorization" : `Bearer ${token}`}});
}

// export function putDestination(id, values) {
//   return apiBackEnd.put(URL_BACK_DESTINATIONS + id, values);
// }


export function insertDestination(values, token) {
  return apiBackEnd.post(URL_BACK_DESTINATIONS, values, {headers: {"Authorization" : `Bearer ${token}`}});
}
