import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../api/api";

export default function AddVehicle() {
  const { id } = useParams(); // categoryId
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !color || !pricePerDay || !image) {
      Swal.fire("Erreur", "Tous les champs sont obligatoires", "error");
      return;
    }

    const formData = new FormData();
    formData.append("category", id);
    formData.append("name", name);
    formData.append("color", color);
    formData.append("pricePerDay", pricePerDay);
    formData.append("image", image);

    await api.addVehicle(formData);

    Swal.fire("Succès", "Véhicule ajouté avec succès", "success");
    navigate(-1);
  };

  return (
    <div style={page}>
      <form onSubmit={submit} style={card}>
        {/* HEADER */}
        <div style={header}>
          <span style={icon}>🚗</span>
          <h2 style={title}>Ajouter un véhicule</h2>
          <p style={subtitle}>
            Renseignez les informations du véhicule
          </p>
        </div>

        {/* INPUTS */}
        <input
          style={input}
          placeholder="Nom du véhicule"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={input}
          placeholder="Couleur"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <input
          style={input}
          type="number"
          placeholder="Prix / jour (DT)"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
        />

        {/* FILE */}
        <label style={fileLabel}>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image ? "✔ Image sélectionnée" : "📷 Choisir une image"}
        </label>

        {/* BUTTON */}
        <button style={btn}>Enregistrer</button>
      </form>
    </div>
  );
}

/* ================= LUXURY STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top, #020617, #0f172a)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
};

const card = {
  width: 420,
  background: "linear-gradient(180deg,#0b0b0b,#020617)",
  padding: "32px 30px",
  borderRadius: 24,
  border: "1px solid rgba(201,162,77,0.25)",
  boxShadow: "0 25px 60px rgba(0,0,0,.7)",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  color: "#e5e7eb",
};

const header = {
  textAlign: "center",
  marginBottom: 10,
};

const icon = {
  fontSize: 28,
  color: "#c9a24d",
};

const title = {
  margin: "6px 0",
  color: "#c9a24d",
  letterSpacing: 1,
};

const subtitle = {
  fontSize: 14,
  opacity: 0.75,
};

const input = {
  padding: "14px 16px",
  borderRadius: 14,
  background: "#020617",
  border: "1px solid #1e293b",
  color: "#f5f5f5",
  fontSize: 14,
  outline: "none",
};

const fileLabel = {
  padding: "14px",
  borderRadius: 14,
  background: "#020617",
  border: "1px dashed #c9a24d",
  color: "#c9a24d",
  textAlign: "center",
  cursor: "pointer",
  fontSize: 14,
};

const btn = {
  marginTop: 10,
  padding: "14px",
  borderRadius: 16,
  background: "linear-gradient(135deg,#c9a24d,#e6c77a)",
  color: "#0b0b0b",
  fontWeight: 900,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(201,162,77,.35)",
};
