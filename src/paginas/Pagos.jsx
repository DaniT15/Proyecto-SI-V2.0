import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import BotonPaypal from '../componentes/BotonPaypal';
import '../estilos/pagos.css';

function Pagos() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStudent, setIsStudent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const userDocRef = doc(db, 'users', authUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.tipo === 'estudiante') {
            setIsStudent(true);
          } else {
            setIsStudent(false);
            console.log("Acceso denegado: No eres estudiante");
          }
        }
      } else {
        setUser(null);
        setIsStudent(false);
        console.log("No estás autenticado");
        navigate('/LandingPage');
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="pagos-container">
      <h2>Página de Pagos</h2>
      {user && isStudent ? (
        <BotonPaypal />
      ) : (
        <p>Debes iniciar sesión como estudiante para acceder a esta página.</p>
      )}
    </div>
  );
}

export default Pagos;