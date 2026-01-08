import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    Swal.fire({ icon: "success", title: "Déconnecté" });
    nav("/login");
  };

  if (!user) return null;

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>CAR RENTAL</div>

      <div style={styles.links}>
        {user.role === "admin" ? (
          <>
            <Link to="/categories">Catégories</Link>
            <Link to="/admin/reservations">Réservations</Link>
          </>
        ) : (
          <>
            <Link to="/home">Accueil</Link>
            <Link to="/categories">Catégories</Link>
            <Link to="/my-reservations">Mes réservations</Link>
          </>
        )}
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "rgba(11,11,11,0.9)",
    backdropFilter: "blur(6px)",
    borderBottom: "1px solid #1f1f1f",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontWeight: 700,
    letterSpacing: 2,
    color: "#c9a24d",
  },
  links: {
    display: "flex",
    gap: 24,
    alignItems: "center",
  },
  logout: {
    background: "transparent",
    border: "1px solid #c9a24d",
    color: "#c9a24d",
  },
};
