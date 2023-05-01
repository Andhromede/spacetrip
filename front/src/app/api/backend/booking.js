import { URL_BACK_BOOKING, URL_BACK_BOOKING_UPDATE } from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";


export function bookings() {
  return apiBackEnd.get(URL_BACK_BOOKING);
}

export function getBookingByIdUser(id, token) {
  return apiBackEnd.get(URL_BACK_BOOKING +"user/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deleteBooking(deleteId, token) {
  return apiBackEnd.delete(URL_BACK_BOOKING + deleteId, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getBookingByHousing(id) {
  return apiBackEnd.get(URL_BACK_BOOKING + "housing/" + id);
}

export function createBooking(values, token ) {
  return apiBackEnd.post(URL_BACK_BOOKING, values, {
    headers: { "Authorization": `Bearer ${token}` }
  });
}

export function updateBooking(id, values, token) {
  return apiBackEnd.put(URL_BACK_BOOKING + id, values, {headers: {"Authorization" : `Bearer ${token}`}});
}
