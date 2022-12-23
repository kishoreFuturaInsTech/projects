import axios from "axios";

const userId = sessionStorage.getItem("userId");
class AddressApi {
  getAllAddress() {
    return axios.get(`http://localhost:8080/address/getall/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
}

export default new AddressApi();
