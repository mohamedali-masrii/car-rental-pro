import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function VehiclesByCategory() {
  const { id } = useParams(); // categoryId
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vehicles, setVehicles] = useState([]);

  const loadVehicles = async () => {
    const data = await api.getVehiclesByCategory(id);
    setVehicles(data);
  };

  useEffect(() => {
    loadVehicles();
  }, [id]);

  const deleteVehicle = async (vehicleId) => {
    const result = await Swal.fire({
      title: "Supprimer ?",
      text: "Cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      await api.deleteVehicle(vehicleId);
      Swal.fire("Supprimé", "Véhicule supprimé", "success");
      loadVehicles();
    }
  };

  const reserveVehicle = async (vehicleId) => {
    const { value: form } = await Swal.fire({
      title: "Réserver le véhicule",
      html: `
        <input id="firstName" class="swal2-input" placeholder="Prénom">
        <input id="lastName" class="swal2-input" placeholder="Nom">
        <input id="phone" class="swal2-input" placeholder="Téléphone">
        <input id="cin" class="swal2-input" placeholder="CIN">
        <input id="days" type="number" class="swal2-input" placeholder="Nombre de jours">
      `,
      focusConfirm: false,
      preConfirm: () => ({
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phone: document.getElementById("phone").value,
        cin: document.getElementById("cin").value,
        days: document.getElementById("days").value,
      }),
      showCancelButton: true,
      confirmButtonText: "Réserver",
    });

    if (form) {
      await api.createReservation({
        vehicle: vehicleId,
        ...form,
      });
      Swal.fire("Succès", "Réservation effectuée", "success");
      navigate("/my-reservations");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#fff", padding: 24 }}>
      <h2>🚗 Véhicules disponibles</h2>

      {user?.role === "admin" && (
        <button
          onClick={() => navigate(`/categories/${id}/add-vehicle`)}
          style={btnAdd}
        >
          ➕ Ajouter un véhicule
        </button>
      )}

      <div style={grid}>
        {vehicles.map((v) => (
          <div key={v._id} style={card}>
            <img
              src={`http://localhost:5000${v.image}`}
              alt={v.name}
              style={img}
            />
            <h3>{v.name}</h3>
            <p>Couleur : {v.color}</p>
            <p>Prix / jour : {v.pricePerDay} DT</p>

            {user?.role === "admin" ? (
              <div style={actions}>
                <button
                  style={btnEdit}
                  onClick={() =>
                    navigate(`/categories/${id}/edit-vehicle/${v._id}`)
                  }
                >
                  ✏️ Modifier
                </button>
                <button
                  style={btnDelete}
                  onClick={() => deleteVehicle(v._id)}
                >
                  🗑️ Supprimer
                </button>
              </div>
            ) : (
              <button
                style={btnReserve}
                onClick={() => reserveVehicle(v._id)}
              >
                📅 Réserver
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== styles ===== */
/* ===== styles ===== */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
  marginTop: 24,
};

const card = {
  background: "linear-gradient(180deg, #121212, #0b0b0b)",
  borderRadius: 20,
  padding: 18,
  border: "1px solid #1f1f1f",
  boxShadow: "0 10px 30px rgba(0,0,0,.5)",
};

const img = {
  width: "100%",
  height: 170,
  objectFit: "cover",
  borderRadius: 14,
  marginBottom: 14,
};

const actions = {
  display: "flex",
  gap: 12,
  marginTop: 10,
};

const btnAdd = {
  marginTop: 14,
  padding: "12px 18px",
  borderRadius: 14,
  background: "linear-gradient(135deg,#c9a24d,#e6c77a)",
  color: "#0b0b0b",
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
};

const btnEdit = {
  flex: 1,
  padding: 10,
  background: "transparent",
  border: "1px solid #c9a24d",
  color: "#c9a24d",
  borderRadius: 10,
  fontWeight: 600,
  cursor: "pointer",
};

const btnDelete = {
  flex: 1,
  padding: 10,
  background: "transparent",
  border: "1px solid #b91c1c",
  color: "#b91c1c",
  borderRadius: 10,
  fontWeight: 600,
  cursor: "pointer",
};

const btnReserve = {
  marginTop: 12,
  padding: 12,
  background: "linear-gradient(135deg,#c9a24d,#e6c77a)",
  color: "#0b0b0b",
  fontWeight: 700,
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
};
