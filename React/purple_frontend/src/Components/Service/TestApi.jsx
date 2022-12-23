import axios from "axios";
class TestApi {
  getAllCompanies() {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8080/company/getall/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllUsers() {
    return axios.get(`http://localhost:8080/api/auth/user/getall`);
  }

  verifyUser(id) {
    return axios.patch(`http://localhost:8080/api/auth/user/verify/${id}`);
  }

  getUserById() {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8080/api/auth/user/${userId}`);
  }
}

export default new TestApi();
