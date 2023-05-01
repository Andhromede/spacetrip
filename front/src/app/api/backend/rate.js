import { URL_BACK_RATE} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";


// Get all by housing
export function getRatesByHousing(id) {
  return apiBackEnd.get(URL_BACK_RATE + id);
}
// Get all by user
export function getRatesByUser(id) {
  return apiBackEnd.get(URL_BACK_RATE+ "user/" + id);
}

// get all
export function getRates() {
  return apiBackEnd.get(URL_BACK_RATE);
}

// new rate
export function createRate(values, token) {
  return apiBackEnd.post(URL_BACK_RATE, values, {headers: {"Authorization" : `Bearer ${token}`}});
}

// update rate
export function updateRate(id, values, token) {
  return apiBackEnd.put(URL_BACK_RATE + id, values, {headers: {"Authorization" : `Bearer ${token}`}});
}


