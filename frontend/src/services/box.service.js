import http from "../utils/http-common";

class BoxDataService {

  getAllBoxesInAParking(id){
    return http.get(`/boxes/parking/${id}`);
  }

  getOneWithUserId(id){
    return http.get(`/boxes/user/${id}`);
  }

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

  resetAllBoxesInAParking(id) {
    return http.put(`/boxes/reset/${id}`);
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