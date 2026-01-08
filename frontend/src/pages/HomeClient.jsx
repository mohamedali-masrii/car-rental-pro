 import { useAuth } from "../context/AuthContext";

export default function HomeClient() {
  const { user } = useAuth();

  return (
    <div style={page}>
      {/* HERO */}
      <section style={hero}>
        <h1 style={title}>
          Bienvenue, <span style={gold}>{user?.fullName}</span> 👋
        </h1>

        <p style={description}>
          Notre agence de location de voitures vous propose une expérience premium
          alliant confort, sécurité et performance. Nous mettons à votre disposition
          une flotte de véhicules modernes et soigneusement entretenus, allant des SUV
          spacieux aux berlines élégantes, en passant par des modèles sportifs performants.
          Grâce à un service de réservation simple et rapide, des tarifs compétitifs et
          une assistance client réactive, nous nous engageons à répondre à tous vos besoins
          de mobilité, que ce soit pour un déplacement professionnel ou personnel.
          <br /><br />
          Notre priorité est de vous offrir une expérience de conduite agréable,
          fiable et à la hauteur de vos attentes.
        </p>
      </section>

      {/* CATEGORIES */}
      <section style={categoriesSection}>

        <div style={categoriesGrid}>
          {categories.map((c, index) => (
            <div key={index} style={categoryCard}>
              <img src={c.img} alt="categorie" style={categoryImage} />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={contactSection}>
        <h3 style={{ marginBottom: 10 }}>📞 Contact</h3>
        <p style={contactText}>
          📧 agency@carrental.com &nbsp; | &nbsp; 📱 +216 XX XXX XXX
        </p>
      </section>
    </div>
  );
}

const categories = [
  {
    img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=80", // SUV moderne
  },
  {
    img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=80", // voiture sportive
  },
 
  {
    img: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1400&q=80", // SUV luxe
  },
  {
    img: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1400&q=80", // sport élégante
  },

];


/* ================= STYLES ================= */
const categoryCard = {
  borderRadius: 22,
  overflow: "hidden",
  boxShadow: "0 15px 40px rgba(0,0,0,.45)",
  transition: "transform .35s ease, box-shadow .35s ease",
};

const categoryCardHover = {
  transform: "scale(1.03)",
};

const page = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #020617, #0f172a)",
  color: "#e5e7eb",
  padding: "80px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const hero = {
  maxWidth: 900,
  textAlign: "center",
  marginBottom: 80,
  marginTop: 40,
};


const title = {
  fontSize: 44,
  fontWeight: 800,
  marginBottom: 20,
};

const gold = {
  color: "#facc15",
};

const description = {
  fontSize: 17,
  lineHeight: 1.9,
  opacity: 0.9,
  maxWidth: 780,
  margin: "0 auto",
};


const categoriesSection = {
  width: "100%",
  maxWidth: 1200,
  marginBottom: 60,
};

const sectionTitle = {
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 24,
  textAlign: "center",
};

const categoriesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};



const categoryImage = {
  width: "100%",
  height: 220,
  objectFit: "cover",
  display: "block",
};

const contactSection = {
  maxWidth: 700,
  width: "100%",
  background: "#020617",
  borderRadius: 20,
  padding: "26px 30px",
  textAlign: "center",
  boxShadow: "0 12px 35px rgba(0,0,0,.5)",
  marginTop: 40,
};


const contactText = {
  fontSize: 16,
  opacity: 0.85,
};


 
 