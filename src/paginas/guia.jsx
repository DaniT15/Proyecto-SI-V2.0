import React, { useState, useEffect } from 'react';
import Ruta from '../componentes/Ruta';
import '../estilos/guia.css';
import { db, collection, getDocs, query, where } from '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig'; //Importamos auth para obtener el usuario actual.

export default function Guia() {
  const [actividades, setActividades] = useState([]);
  const guiaId = auth.currentUser.uid; //obtenemos el id del usuario actual

  useEffect(() => {
    const fetchActividades = async () => {
      if (guiaId) { //condicional para verificar que el usuario esta logeado.
        const actividadesCollection = collection(db, 'actividades');
        const q = query(actividadesCollection, where('guiaId', '==', guiaId)); // Filtramos por guiaId
        const actividadesSnapshot = await getDocs(q);
        const fetchedActividades = actividadesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setActividades(fetchedActividades);
      } else {
        console.log("Usuario no logeado");
      }
    };

    fetchActividades();
  }, [guiaId]); //dependencia de guiaId para que se actualice cuando cambia el usuario.

  return (
    <div className="rutas-div1">
      <h1 className="titulo-rutas1">Rutas Asignadas</h1>
      {actividades.length === 0 ? (
        <p>No hay rutas asignadas.</p>
      ) : (
        actividades.map((actividad, index) => (
          <Ruta key={index} {...actividad} />
        ))
      )}
    </div>
  );
}