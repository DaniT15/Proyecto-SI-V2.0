import '../estilos/verPerfil.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../contextos/UserContext";
import { useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config/firebaseConfig";
import userlogo from "../assets/userlogo.png";

const auth = getAuth(app);

export default function VerPerfil() {
    const contextUser = useContext(UserContext);
    const { user, setUser, profile, logged } = contextUser;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
    };

    // Función para verificar si el usuario es un guía
    const esGuia = () => {
        return profile?.tipo === "guia"; // Asegúrate de que el rol se almacene como "guia" en tu base de datos
    };

    return (
        <div className="perfil-container">
            <h1>Perfil</h1>
            {/* Muestra la foto de perfil */}
            <img src={profile?.foto_perfil || userlogo} alt="Foto de perfil" className="perfil-foto" />

            <div className="info">
                <div className="dato">
                    <label>Nombre</label>
                    <p>{profile?.name}</p>
                </div>
                <div className="dato">
                    <label>Número telefónico</label>
                    <p>{profile?.telefono}</p>
                </div>
                <div className="dato">
                    <label>Correo</label>
                    <p>{profile?.email}</p>
                </div>
            </div>

            {/* Botón condicional para guías */}
            {esGuia() && (
                <button className="ver-actividades" onClick={() => navigate("/guia")}>
                    Ver Actividades
                </button>
            )}

            <Link to="/editarPerfil">
                <button className="editar-perfil">
                    Editar Perfil
                </button>
            </Link>
            <Link to="/">
                <button className="cerrar-sesion" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </Link>
        </div>
    );
}