import http from "../utils/http-common";

class ScooterDataService {
  getAll() {
    return http.get("/scooters");
  }

  getScooterWithUserId(userId) {
    return http.get(`/scooters/user/${userId}`);
  }

  get(id) {
    return http.get(`/scooters/${id}`);
  }

  create(data) {
    return http.post("/scooters", data);
  }

  update(id, data) {
    return http.put(`/scooters/${id}`, data);
  }

  delete(id) {
    return http.delete(`/scooters/${id}`);
  }

  deleteAll() {
    return http.delete(`/scooters`);
  }

  findAllFree() {
    return http.get("/scooters/freeScooters");
  }

//   findByTitle(title) {
//     return http.get(`/parkings?title=${title}`);
//   }
}

export default new ScooterDataService();