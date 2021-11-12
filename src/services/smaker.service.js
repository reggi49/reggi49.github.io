import http from "../http-common";

class SeatmakerDataService {
  getAll(params) {
    return http.get("/smaker", { params });
  }

  getDashboard() {
    return http.get("/smaker/dashboard");
  }

  getLastApplication(params) {
    return http.get("/smaker/lastapplication", { params });
  }

  getProfile(id) {
    return http.get(`/smaker/profile/${id}`);
  }

  get(id) {
    return http.get(`/smaker/${id}`);
  }

  create(data) {
    return http.post("/smaker", data);
  }

  update(id, data) {
    return http.put(`/smaker/${id}`, data);
  }

  delete(id) {
    return http.delete(`/smaker/${id}`);
  }

  deleteimage(id) {
    return http.delete(`/smaker/upload/${id}`);
  }

  deleteAll() {
    return http.delete(`/smaker`);
  }

  findByTitle(title) {
    return http.get(`/smaker?title=${title}`);
  }

  acceptimage(id, data) {
    return http.put(`/smaker/upload/${id}`, data);
  }

  submitDescription(id, data) {
    return http.put(`/smaker/description/${id}`, data);
  }

  pendingimage(id) {
    return http.put(`/smaker/upload/${id}`);
  }

  upload(file, idseatmaker, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("idseatmaker", idseatmaker);

    return http.post("/smaker/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
  getFiles() {
    return http.get("smaker/files");
  }
}

export default new SeatmakerDataService();
