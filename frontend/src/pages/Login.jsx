import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);

    if (res.token) {
      Swal.fire({ icon: "success", title: "Connexion réussie" });
      nav(res.user.role === "admin" ? "/categories" : "/home");
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: res.message || "Login failed",
      });
    }
  };

  return (
    <div style={page}>
      <form onSubmit={submit} style={card}>
        {/* HEADER */}
        <div style={header}>
          <h1 style={brand}>CAR RENTAL</h1>
          <p style={subtitle}>Connexion</p>
        </div>

        {/* INPUTS */}
        <input
          style={input}
          placeholder="Adresse email"
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

        {/* BUTTON */}
        <button style={btn}>Se connecter</button>

        {/* FOOTER */}
        <p style={footer}>
          Client ?{" "}
          <Link to="/register" style={link}>
            Créer un compte
          </Link>
        </p>
      </form>
    </div>
  );
}

/* ================= LUXURY STYLES ================= */

const page = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background: "radial-gradient(circle at top, #1a1a1a, #0b0b0b)",
};

const card = {
  width: 420,
  padding: "36px 32px",
  borderRadius: 24,
  background: "linear-gradient(180deg,#121212,#0b0b0b)",
  border: "1px solid rgba(201,162,77,0.25)",
  boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
  display: "flex",
  flexDirection: "column",
  gap: 18,
};

const header = {
  textAlign: "center",
  marginBottom: 10,
};

const brand = {
  margin: 0,
  color: "#c9a24d",
  fontWeight: 900,
  letterSpacing: 2,
};

const subtitle = {
  marginTop: 6,
  color: "#b5b5b5",
  fontSize: 15,
};

const input = {
  padding: "14px 16px",
  borderRadius: 14,
  background: "#0b0b0b",
  border: "1px solid #2a2a2a",
  color: "#f5f5f5",
  fontSize: 15,
  outline: "none",
};

const btn = {
  marginTop: 12,
  padding: "14px",
  borderRadius: 16,
  background: "linear-gradient(135deg,#c9a24d,#e6c77a)",
  color: "#0b0b0b",
  fontWeight: 900,
  fontSize: 15,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(201,162,77,0.35)",
  transition: "transform .2s ease, box-shadow .2s ease",
};

const footer = {
  textAlign: "center",
  marginTop: 6,
  fontSize: 14,
  color: "#9a9a9a",
};

const link = {
  color: "#c9a24d",
  fontWeight: 600,
  textDecoration: "none",
};
