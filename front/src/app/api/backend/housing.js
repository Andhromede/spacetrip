import { URL_BACK_HOUSINGS } from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";


/******** Find by Destination ********/
export function getHousingByDestination(id) {
  return apiBackEnd.get(URL_BACK_HOUSINGS + "/planet/" + id);
}

/******** Find all ********/
export function getAllHousings() {
  return apiBackEnd.get(URL_BACK_HOUSINGS);
}

/******** Find one by Id ********/
export function getHousing(id) {
  return apiBackEnd.get(URL_BACK_HOUSINGS + id);
}

/******** Update one ********/
export function putHousing(id, values, token) {
  return apiBackEnd.put(URL_BACK_HOUSINGS + id, values, {headers: {"Authorization" : `Bearer ${token}`}});
}

/******** Create one ********/
export function createHousing(values, token) {
  return apiBackEnd.post(URL_BACK_HOUSINGS, values, {headers: {"Authorization" : `Bearer ${token}`}});
}
