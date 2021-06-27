import http from "../utils/http-common";

class UserDataService {
  signin(data) {
    return http.post("/users/signin", data);
  }

  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

//   findByTitle(title) {
//     return http.get(`/parkings?title=${title}`);
//   }
}

export default new UserDataService();