import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useLocation } from 'react-router-dom';
import "../estilos/reservar.css"
import CalendarioReserva from '../componentes/CalendarioReserva';



export default function Reservar() {
    const [ruta, setRuta] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const rutaId = searchParams.get('rutaId');


    useEffect(() => {
        if (!rutaId) {
            console.error('Reservar: rutaId is undefined');
            setLoading(false);
            return;
        }

        const obtenerRuta = async () => {
            try {
                const rutaRef = doc(db, 'rutas', rutaId);
                const rutaSnap = await getDoc(rutaRef);

                if (rutaSnap.exists()) {
                    setRuta(rutaSnap.data());
                } else {
                    console.log('No se encontró la ruta');
                }
            } catch (error) {
                console.error('Error al obtener la ruta:', error);
            } finally {
                setLoading(false);
            }
        };

        obtenerRuta();
    }, [rutaId]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!ruta) {
        return <div>Ruta no encontrada</div>;
    }

    return (
        <div className='margen'>
            <div className="div-reservar">
                <div className='reservar-datos'>
                    <div>
                        <img src={ruta.foto_portada} alt={ruta.nombre} className="reservar-imagen" />
                    </div>

                    <div className="reservar-info">
                        <h1>{ruta.nombre}</h1>
                        <p>Dificultad: {ruta.dificultad}</p>
                        <p>Distancia: {ruta.distancia}km</p>
                        <p>Tiempo estimado: {ruta.tiempo} min</p>
                        <p>Descripción: {ruta.descripcion}</p>
                    </div>
                </div>
                <div className='reservar-calendario'>
                    <CalendarioReserva rutaId={ruta.id} />
                </div>

            </div>
        </div>
    );
}
