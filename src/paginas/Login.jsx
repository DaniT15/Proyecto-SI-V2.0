import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider, signInWithEmailAndPassword, signInWithPopup } from "../config/firebaseConfig";
import "../estilos/login.css";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();

  const validateEmailDomain = (email) => {
    return email.endsWith('@correo.unimet.edu.ve');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmailDomain(email)) {
      setError('El correo electrónico debe pertenecer a @correo.unimet.edu.ve ❌');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.tipo === "estudiante" || userData.tipo === "guia") {
          alert("Inicio de sesión exitoso ✅");
          navigate("/");
        } else if (userData.tipo === "administrador") {
          alert("Inicio de sesión exitoso ✅");
          navigate("/menuAdmin");
        } else {
          alert("Inicio de sesión exitoso ✅");
          navigate("/");
        }
      } else {
        setError("Usuario no encontrado ❌");
      }
    } catch (err) {
      console.log(err);
      setError("Correo o contraseña incorrectos ❌");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.tipo === "estudiante" || userData.tipo === "guia") {
          alert("Inicio de sesión con Google exitoso ✅");
          console.log(userData.tipo);
          navigate("/");
        } else if (userData.tipo === "administrador") {
          alert("Inicio de sesión con Google exitoso ✅");
          navigate("/menuAdmin");
        } else {
          alert("Inicio de sesión con Google exitoso ✅");
          navigate("/");
        }
      } else {
        setError("Usuario no encontrado ❌");
      }
    } catch (err) {
      setError("Error al iniciar sesión con Google ❌");
    }

    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithPopup(auth, facebookProvider);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.tipo === "estudiante" || userData.tipo === "guia") {
          alert("Inicio de sesión con Facebook exitoso ✅");
          navigate("/");
        } else if (userData.tipo === "administrador") {
          alert("Inicio de sesión con Facebook exitoso ✅");
          navigate("/menuAdmin");
        } else {
          alert("Inicio de sesión con Facebook exitoso ✅");
          navigate("/");
        }
      } else {
        setError("Usuario no encontrado ❌");
      }
    } catch (err) {
      setError("Error al iniciar sesión con Facebook ❌");
    }

    setLoading(false);
  };

  return (
    <div className="margen">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <hr />

        <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
          Iniciar sesión con Google
        </button>

        <button className="facebook-btn" onClick={handleFacebookLogin} disabled={loading}>
          Iniciar sesión con Facebook
        </button>

        <Link to="/registrarse">
          <button className="registrarse-btn">Registrarse</button>
        </Link>
      </div>
    </div>
  );
}