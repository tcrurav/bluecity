import http from "../utils/http-common";

class ParkingDataService {
  getAll() {
    return http.get("/parkings");
  }

  findAllWithAFreeScooter() {
    return http.get("/parkings/freeParkings");
  }

  findAllWithAFreeBox() {
    return http.get("/parkings/freeBoxes");
  }

  get(id) {
    return http.get(`/parkings/${id}`);
  }

  create(data) {
    return http.post("/parkings", data);
  }

  update(id, data) {
    return http.put(`/parkings/${id}`, data);
  }

  delete(id) {
    return http.delete(`/parkings/${id}`);
  }

  deleteAll() {
    return http.delete(`/parkings`);
  }

//   findByTitle(title) {
//     return http.get(`/parkings?title=${title}`);
//   }
}

export default new ParkingDataService();