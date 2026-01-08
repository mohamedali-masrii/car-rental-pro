import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../api/api";

export default function AddCategory() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      Swal.fire("Erreur", "Nom et image obligatoires", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    await api.addCategory(formData);

    Swal.fire("Succès", "Catégorie ajoutée", "success");
    navigate("/categories");
  };

  return (
    <div style={page}>
      <form onSubmit={submit} style={card}>
        {/* HEADER */}
        <div style={header}>
          <span style={icon}>＋</span>
          <h2 style={title}>Ajouter une catégorie</h2>
          <p style={subtitle}>
            Créez une nouvelle catégorie de véhicules
          </p>
        </div>

        {/* INPUTS */}
        <input
          style={input}
          placeholder="Nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          style={{ ...input, minHeight: 90 }}
          placeholder="Description de la catégorie"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
  fontSize: 26,
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
