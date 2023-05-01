import axios from "axios";

const apiBackEnd = axios.create({
  baseURL: "http://localhost:8080/api",
});
export default apiBackEnd;
