import "../estilos/header.css"
import logo from "../assets/logo.png"
import userlogo from "../assets/userlogo.png"
import { Link } from 'react-router-dom';
import { UserContext } from "../contextos/UserContext";
import { useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config/firebaseConfig";

const auth = getAuth(app)

export default function Header() {
    const contextUser = useContext(UserContext)
    const { user, setUser, profile, logged } = contextUser

    return (
        <header className="header">
            <div className="container-pages">
                {profile && profile.tipo === "administrador" ? (
                    <Link to="/menuAdmin" className="container-img">
                        <img src={logo} alt="logo" className="logo" />
                    </Link>
                ) : (
                    <Link to="/" className="container-img">
                        <img src={logo} alt="logo" className="logo" />
                    </Link>
                )}
                <Link to="/conocenos" className="header-titulos">
                    <p>CONÓCENOS</p>
                </Link>
                <Link to="/rutas" className="header-titulos">
                    <p>RUTAS</p>
                </Link>
                <Link to="/galeria" className="header-titulos">
                    <p>GALERÍA</p>
                </Link>
                <Link to="/comentarios" className="header-titulos">
                    <p>{!logged}FORO</p>
                </Link>
            </div>
            <div className="container-user">
                {!logged ?
                    <Link to="/login" className="container-user">
                        <img src={userlogo} alt="usuario" className="user-logo" />
                        <p>Iniciar Sesión</p>
                    </Link> :
                    <div className="container-user-registered">
                        <Link to="/verPerfil" className="container-user">
                            <img src={userlogo} alt="usuario" className="user-logo" />
                            <p>Ver Perfil: {profile?.name}</p>
                        </Link>
                    </div>
                }
                
            </div>
        </header>
    )
}
