import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import FotoRuta from '../componentes/FotoRuta'; // Importamos FotoRuta para gestionar la foto de portada
import '../estilos/registrarRuta.css';

export default function RegistrarRuta() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dificultad, setDificultad] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [distancia, setDistancia] = useState('');
    const [status, setStatus] = useState('');
    const [portadaURL, setPortadaURL] = useState(''); // Estado para la URL de la foto de portada

    // Esta función se pasa a FotoRuta para actualizar el estado con la URL de la foto de portada
    const handlePortadaUpload = (url) => {
        setPortadaURL(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Registrando...');

        try {
            // Registrar la ruta con la URL de la foto de portada
            await addDoc(collection(db, 'rutas'), {
                nombre,
                descripcion,
                dificultad,
                tiempo: parseInt(tiempo),
                distancia: parseFloat(distancia),
                foto_portada: portadaURL, // Guardar la URL de la foto de portada
            });

            setStatus('Ruta registrada con éxito ✅');
            setNombre('');
            setDescripcion('');
            setDificultad('');
            setTiempo('');
            setDistancia('');
            setPortadaURL(''); // Limpiar la URL de la foto de portada
        } catch (error) {
            console.error('Error al registrar la ruta:', error);
            setStatus('Error al registrar la ruta ❌');
        }
    };

    return (
        <div className='margen'>
            <div className='registrarRuta-container'>
                <h2>Registrar Ruta</h2>
                <form onSubmit={handleSubmit}>
                    <div className='info'>
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className='info'>
                        <label>Descripción:</label>
                        <textarea className='descripcion' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                    </div>
                    <div className='info'>
                        <label>Dificultad:</label>
                        <input type="text" value={dificultad} onChange={(e) => setDificultad(e.target.value)} required />
                    </div>
                    <div className='info'>
                        <label>Duración (minutos):</label>
                        <input type="number" value={tiempo} onChange={(e) => setTiempo(e.target.value)} required />
                    </div>
                    <div className='info'>
                        <label>Distancia (km):</label>
                        <input type="number" step="0.01" value={distancia} onChange={(e) => setDistancia(e.target.value)} required />
                    </div>

                    {/* Componente FotoRuta para subir la foto de portada */}
                    <FotoRuta onPortadaUpload={handlePortadaUpload} />

                    <button type="submit">Registrar</button>
                </form>
                {status && <p>{status}</p>}
            </div>
        </div>
    );
}