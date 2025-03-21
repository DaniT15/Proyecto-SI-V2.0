import React, { useState, useEffect } from 'react';
import Ruta from '../componentes/Ruta';
import '../estilos/guia.css'; // Importing the guia.css file
import { db, collection, getDocs } from '../config/firebaseConfig'; // Import Firestore functions

export default function Guia() {
    const [rutas, setRutas] = useState([]);

    useEffect(() => {
        // Fetch the routes assigned by the admin from Firestore
        const fetchRutas = async () => {
            const rutasCollection = collection(db, 'rutas'); // Reference to the 'rutas' collection
            const rutasSnapshot = await getDocs(rutasCollection);
            const fetchedRutas = rutasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map to get data
            setRutas(fetchedRutas);
        };

        fetchRutas();
    }, []);

    return (
        <div className="rutas-div">
            <h1 className="titulo-rutas">Rutas Asignadas</h1>
            {rutas.length === 0 ? (
                <p>No hay rutas asignadas.</p> // Adding a message when no routes are available
            ) : (
                rutas.map((ruta, index) => (
                    <Ruta key={index} {...ruta} />
                ))
            )}
        </div>
    );
}
