import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(fullName, email, password);

    if (res.token || res.user) {
      Swal.fire({
        icon: "success",
        title: "Compte créé",
        text: "Connecte-toi maintenant",
      });
      nav("/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: res.message || "Register failed",
      });
    }
  };

  return (
    <div style={page}>
      <form onSubmit={submit} style={card}>
        <h2 style={title}>Inscription Client</h2>

        <input
          style={input}
          placeholder="Nom complet"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          style={input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={btn}>Créer le compte</button>
      </form>
    </div>
  );
}

/* ===== SAME LUXURY THEME ===== */

const page = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background:
    "linear-gradient(180deg, #0b0b0b 0%, #121212 100%)",
};

const card = {
  width: 460,
  background: "linear-gradient(180deg,#121212,#0b0b0b)",
  padding: 28,
  borderRadius: 20,
  border: "1px solid #1f1f1f",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
};

const title = {
  textAlign: "center",
  color: "#c9a24d",
  letterSpacing: 1,
};

const input = {
  padding: 14,
  borderRadius: 12,
  background: "#0b0b0b",
  border: "1px solid #2a2a2a",
  color: "#f5f5f5",
};

const btn = {
  marginTop: 10,
  padding: 14,
  borderRadius: 14,
  background: "linear-gradient(135deg,#c9a24d,#e6c77a)",
  color: "#0b0b0b",
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
};
