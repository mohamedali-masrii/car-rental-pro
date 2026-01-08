import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const nav = useNavigate();


  /* =====================
     LOAD CATEGORIES
  ===================== */
  const loadCategories = async () => {
    const data = await api.getCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  /* =====================
     DELETE CATEGORY (ADMIN)
  ===================== */
  const deleteCategory = async (categoryId) => {
    const result = await Swal.fire({
      title: "Supprimer cette catégorie ?",
      text: "Cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      await api.deleteCategory(categoryId);
      Swal.fire("Supprimée", "Catégorie supprimée", "success");
      loadCategories(); // 🔥 refresh
    }
  };

  return (
    <div style={page}>
      {/* ===== HEADER ===== */}
      <div style={header}>
        <h2>Catégories</h2>

        {user?.role === "admin" && (
          <button
            style={btnAdd}
                onClick={() => nav("/categories/add")}
          >
            ➕ Ajouter catégorie
          </button>
        )}
      </div>

      {/* ===== GRID ===== */}
      <div style={grid}>
        {categories.map((c) => (
          <div
            key={c._id}
            style={card}
            onClick={() => navigate(`/categories/${c._id}/vehicles`)}
          >
            {/* image */}
<img
  src={`http://localhost:5000${c.image}`}
  alt={c.name}
  style={image}
/>

            {/* content */}
            <div style={content}>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
            </div>

            {/* delete (admin only) */}
            {user?.role === "admin" && (
              <button
                style={btnDelete}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCategory(c._id);
                }}
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================
   STYLES
===================== */

const page = {
  minHeight: "100vh",
  background: "transparent",
  padding: 32,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 28,
};

const btnAdd = {
  background: "linear-gradient(135deg,#c9a24d,#e6c77a)",
  color: "#0b0b0b",
  fontWeight: 700,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
};

const card = {
  position: "relative",
  background: "linear-gradient(180deg,#121212,#0b0b0b)",
  borderRadius: 18,
  overflow: "hidden",
  cursor: "pointer",
  transition: "all .3s ease",
  border: "1px solid #1f1f1f",
};

const image = {
  width: "100%",
  height: 160,
  objectFit: "cover",
  filter: "brightness(0.85)",
};

const content = {
  padding: 18,
};

const btnDelete = {
  position: "absolute",
  top: 12,
  right: 12,
  background: "#1a1a1a",
  border: "1px solid #b91c1c",
  color: "#b91c1c",
};
