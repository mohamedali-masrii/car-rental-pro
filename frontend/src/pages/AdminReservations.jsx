import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    api.allReservations().then(setReservations);
  }, []);

  return (
    <div style={page}>
      {/* ===== HEADER ===== */}
      <div style={header}>
        <h2 style={title}>📋 Toutes les réservations</h2>
        <p style={subtitle}>Gestion des réservations clients</p>
      </div>

      {/* ===== CONTENT ===== */}
      {reservations.length === 0 ? (
        <div style={empty}>
          <p>Aucune réservation trouvée.</p>
        </div>
      ) : (
        <div style={grid}>
          {reservations.map((r) => (
            <div key={r._id} style={card}>
              {/* CLIENT */}
              <div style={section}>
                <span style={sectionTitle}>👤 Client</span>
                <p><b>Nom :</b> {r.firstName} {r.lastName}</p>
                <p><b>Email :</b> {r.user?.email}</p>
                <p><b>Téléphone :</b> {r.phone}</p>
                <p><b>CIN :</b> {r.cin}</p>
              </div>

              {/* VEHICLE */}
              <div style={divider} />

              <div style={section}>
                <span style={sectionTitle}>🚗 Véhicule</span>
                <p><b>Nom :</b> {r.vehicle?.name}</p>
                <p><b>Couleur :</b> {r.vehicle?.color}</p>
                <p><b>Prix / jour :</b> {r.vehicle?.pricePerDay} DT</p>
                <p>
                  <b>Durée :</b>{" "}
                  <span style={badge}>{r.days} jours</span>
                </p>
                <p>
                  <b>Total :</b>{" "}
                  <span style={total}>
                    {r.vehicle?.pricePerDay * r.days} DT
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =====================
   STYLES – ADMIN LUXURY
===================== */

const page = {
  minHeight: "100vh",
  padding: 28,
  background: "radial-gradient(circle at top, #111827, #020617)",
  color: "#fff",
};

const header = {
  marginBottom: 28,
};

const title = {
  fontSize: "1.9rem",
  fontWeight: 800,
};

const subtitle = {
  opacity: 0.7,
  marginTop: 4,
};

const empty = {
  padding: 40,
  borderRadius: 18,
  background: "#0b1220",
  border: "1px dashed #334155",
  textAlign: "center",
  opacity: 0.8,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
  gap: 24,
};

const card = {
  background: "linear-gradient(180deg, #0b1220, #020617)",
  borderRadius: 20,
  padding: 22,
  border: "1px solid #1f2937",
  boxShadow: "0 25px 50px rgba(0,0,0,.6)",
};

const section = {
  display: "grid",
  gap: 6,
};

const sectionTitle = {
  fontWeight: 700,
  color: "#e6c77a",
  marginBottom: 6,
};

const divider = {
  height: 1,
  background: "linear-gradient(to right, transparent, #334155, transparent)",
  margin: "16px 0",
};

const badge = {
  padding: "4px 10px",
  borderRadius: 999,
  background: "#1e293b",
  fontWeight: 700,
};

const total = {
  color: "#e6c77a",
  fontWeight: 800,
};
