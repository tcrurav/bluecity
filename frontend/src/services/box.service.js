import http from "../utils/http-common";

class BoxDataService {
  getAll() {
    return http.get("/boxes");
  }

  get(id) {
    return http.get(`/boxes/${id}`);
  }

  create(data) {
    return http.post("/boxes", data);
  }

  update(id, data) {
    return http.put(`/boxes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/boxes/${id}`);
  }

  deleteAll() {
    return http.delete(`/boxes`);
  }

//   findByTitle(title) {
//     return http.get(`/parkings?title=${title}`);
//   }
}

export default new BoxDataService();