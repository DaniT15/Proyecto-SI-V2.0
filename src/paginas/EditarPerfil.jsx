import React, { useState, useEffect, useContext } from 'react';
import { auth, db, doc, getDoc, setDoc, updateDoc } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import FotoPerfil from '../componentes/FotoPerfil'; 
import { UserContext } from "../contextos/UserContext"; // Importa el contexto

import "../estilos/editarPerfil.css";

export default function EditarPerfil() {
  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = auth.currentUser;

  const contextUser = useContext(UserContext); // Usa el contexto
  const { profile, setProfile } = contextUser; // Extrae profile y setProfile

  useEffect(() => {
    if (user) {
      cargarDatos();
    } else {
      navigate("/login");
    }
  }, [user]);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setName(userData.name || "");
        setTelefono(userData.telefono || "");
        setEmail(userData.email || user.email || "");
      } else {
        await setDoc(docRef, { 
          name: user.displayName || "", 
          telefono: "", 
          email: user.email || "",
        });
        setName(user.displayName || "");
        setTelefono("");
        setEmail(user.email || "");
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
    setLoading(false);
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Actualiza los datos en Firebase
      await updateDoc(doc(db, "users", user.uid), { name, telefono, email });
  
      // Actualiza el estado del perfil globalmente
      setProfile({
        ...profile,
        name: name,
        telefono: telefono,
        email: email, // También actualizamos email por consistencia
      });
  
      alert("Datos actualizados correctamente ✅");
      navigate("/verPerfil"); // Redirigir al perfil después de guardar
    } catch (error) {
      console.error("Error actualizando datos:", error);
      alert("Hubo un problema al actualizar ❌");
    }
  
    setLoading(false);
  };

  return (
    <div className="perfil-container">
      <h2>Editar Perfil</h2>

      <div className="foto-perfil-container">
        <FotoPerfil />
      </div>

      <form onSubmit={guardarDatos}>
        <label>Nombre:</label>
        <input type="text" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Teléfono:</label>
        <input type="text" placeholder="Número de teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

        <label>Correo Electrónico:</label>
        <input type="email" placeholder="Correo electrónico" value={email} readOnly disabled />

        <button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar Cambios"}</button>
      </form>
    </div>
  );
}