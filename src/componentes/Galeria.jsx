import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import '../estilos/galeria.css';

const Galeria = () => {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    const fetchFotos = async () => {
      const querySnapshot = await getDocs(collection(db, 'galeria'));
      const fotosArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Ordenar por año descendente
      fotosArray.sort((a, b) => b.year - a.year);
      setFotos(fotosArray);
    };

    fetchFotos();
  }, []);

  return (
    <div className="galeria-contenedor">
      <h1 className="galeria-titulo">Galería</h1>
      <p className="galeria-descripcion">
        Revive nuestras experiencias a través de nuestra galería de fotos inolvidables
      </p>
      <div className="galeria-grid">
        {fotos.map((foto) => (
          <div key={foto.id} className="foto-card">
            <img src={foto.url} alt={`Foto ${foto.year}`} />
            <h3>{foto.year}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;