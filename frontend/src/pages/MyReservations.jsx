import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    api.myReservations().then(setReservations);
  }, []);

  return (
    <div style={page}>
      {/* ===== HEADER ===== */}
      <div style={header}>
        <h2 style={title}>📅 Mes réservations</h2>
        <p style={subtitle}>Historique de vos locations</p>
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
              <div style={cardHeader}>
                <span style={vehicleName}>{r.vehicle?.name}</span>
                <span style={daysBadge}>{r.days} jours</span>
              </div>

              <div style={infos}>
                <Info label="Couleur" value={r.vehicle?.color} />
                <Info label="Prix / jour" value={`${r.vehicle?.pricePerDay} DT`} />
                <Info label="Total" value={`${r.vehicle?.pricePerDay * r.days} DT`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== Small component ===== */
const Info = ({ label, value }) => (
  <div style={infoRow}>
    <span style={infoLabel}>{label}</span>
    <span style={infoValue}>{value}</span>
  </div>
);

/* =====================
   STYLES – LUXURY
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
  fontSize: "1.8rem",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 24,
};

const card = {
  background: "linear-gradient(180deg, #0b1220, #020617)",
  borderRadius: 20,
  padding: 20,
  border: "1px solid #1f2937",
  boxShadow: "0 20px 40px rgba(0,0,0,.5)",
  transition: "transform .2s ease",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const vehicleName = {
  fontSize: "1.2rem",
  fontWeight: 700,
};

const daysBadge = {
  padding: "6px 12px",
  borderRadius: 999,
  background: "linear-gradient(135deg,#c9a24d,#e6c77a)",
  color: "#0b0b0b",
  fontWeight: 700,
  fontSize: ".85rem",
};

const infos = {
  display: "grid",
  gap: 10,
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const infoLabel = {
  opacity: 0.7,
};

const infoValue = {
  fontWeight: 600,
};
