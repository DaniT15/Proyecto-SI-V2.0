import "../estilos/rutas.css"
import flecha from '../assets/flecha-abajo.png'
import separador from '../assets/separador.png'
import Ruta from "../componentes/Ruta"

import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../config/firebaseConfig';

export default function Rutas() {
    const [rutas, setRutas] = useState([]);

    useEffect(() => {
        const fetchRutas = async () => {
            try {
                const rutasCollection = collection(db, 'rutas');
                const rutasSnapshot = await getDocs(rutasCollection);
                const rutasList = rutasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRutas(rutasList);
            } catch (error) {
                console.error('Error al obtener las rutas: ', error);
            }
        };

        fetchRutas();
    }, []);


    return (
        <div className="rutas-div">
            <div className="titulo-div">
                <h1>Nuestras rutas</h1>
                <div className="filtrar-div">
                    <h2>Filtar por</h2>
                    <img className="separador" src={separador} alt="" />
                    <div className="filtrado">
                        <h2>popularidad</h2>
                        <img className="flecha" src={flecha} alt="" />
                    </div>
                </div>
            </div>
            <div className="lista-rutas">
                {rutas.map(ruta => (
                    <div className="div-rutas-boton-reserva">
                        <Ruta key={ruta.id} rutaId={ruta.id}  />
                    </div>
                ))}
            </div>

        </div>
    )
}