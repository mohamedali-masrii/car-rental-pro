const BASE = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const api = {
  // AUTH
  login: (data) =>
    fetch(`${BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),
  register: (data) =>
    fetch(`${BASE}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json()),

  // CATEGORIES
  // ADD category
addCategory: (formData) =>
  fetch(`${BASE}/categories`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  }).then((r) => r.json()),

// DELETE category
deleteCategory: (id) =>
  fetch(`${BASE}/categories/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then((r) => r.json()),

  getCategories: () =>
    fetch(`${BASE}/categories`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(r => r.json()),

  // VEHICLES
  getVehiclesByCategory: (categoryId) =>
    fetch(`${BASE}/vehicles/category/${categoryId}`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(r => r.json()),

  addVehicle: (formData) =>
    fetch(`${BASE}/vehicles`, { method: "POST", headers: { Authorization: `Bearer ${getToken()}` }, body: formData }).then(r => r.json()),

  updateVehicle: (id, formData) =>
    fetch(`${BASE}/vehicles/${id}`, { method: "PUT", headers: { Authorization: `Bearer ${getToken()}` }, body: formData }).then(r => r.json()),

  deleteVehicle: (id) =>
    fetch(`${BASE}/vehicles/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } }).then(r => r.json()),

  // RESERVATIONS
  createReservation: (data) =>
    fetch(`${BASE}/reservations`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` }, body: JSON.stringify(data) }).then(r => r.json()),

  myReservations: () =>
    fetch(`${BASE}/reservations/me`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(r => r.json()),

  allReservations: () =>
    fetch(`${BASE}/reservations`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(r => r.json()),
};
