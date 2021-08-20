import axios from "axios";
//mock API
let API_URL = "https://api.thecoffeehouse.com/api";
export default function callApi(endpoint, method = "GET", headers) {
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    headers,
  }).catch((err) => {
    console.log(err);
  });
}
