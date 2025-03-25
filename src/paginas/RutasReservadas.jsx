import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, query, where } from '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig'; // Importamos auth para obtener el usuario actual.

import '../estilos/rutasReservadas.css'; // Importing the CSS for RutasReservadas

export default function RutasReservadas() {
  const [reservas, setReservas] = useState([]);
  const [rutas, setRutas] = useState([]);
  const userId = auth.currentUser.uid; // Obtenemos el id del usuario actual

  useEffect(() => {
    const fetchReservas = async () => {
      if (userId) {
        const rutasReservadasCollection = collection(db, 'rutasReservadas');
        const q = query(rutasReservadasCollection, where('userId', '==', userId));
        const reservasSnapshot = await getDocs(q);
        const fetchedReservas = reservasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setReservas(fetchedReservas);
      } else {
        console.log("Usuario no logeado");
      }
    };

    fetchReservas();
  }, [userId]);

  useEffect(() => {
    const fetchRutas = async () => {
      const rutasCollection = collection(db, 'rutas');
      const rutasSnapshot = await getDocs(rutasCollection);
      const fetchedRutas = rutasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRutas(fetchedRutas);
    };

    fetchRutas();
  }, []);

  return (
    <div className="rutas-div1">
      <h1 className="titulo-rutas1">Rutas Reservadas</h1>
      {reservas.length === 0 ? (
        <p>No hay rutas reservadas.</p>
      ) : (
        reservas.map((reserva) => {
          const ruta = rutas.find(r => r.id === reserva.rutaId);
          return (
            <div className="ruta" key={reserva.id}>
              <h2 style={{ textAlign: 'center' }}>{ruta ? ruta.nombre : 'Ruta no encontrada'}</h2>
              <p>{ruta ? ruta.descripcion : ''}</p>
              <p style={{ marginTop: '10px' }}>Fecha de Reserva: {reserva.fechaReserva.toDate().toLocaleDateString()}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
