import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { supabase } from '../config/supabaseConfig';
import { useParams } from 'react-router-dom';
 
import '../estilos/registrarRuta.css';

export default function EditarRuta() {
    const { id } = useParams();
    const [ruta, setRuta] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dificultad, setDificultad] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [distancia, setDistancia] = useState('');
    const [portadaFile, setPortadaFile] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const cargarRuta = async () => {
            try {
                const docRef = doc(db, 'rutas', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setRuta(data);
                    setNombre(data.nombre || '');
                    setDescripcion(data.descripcion || '');
                    setDificultad(data.dificultad || '');
                    setTiempo(data.tiempo || '');
                    setDistancia(data.distancia || '');
                } else {
                    setStatus('Ruta no encontrada ❌');
                }
            } catch (error) {
                console.error("Error al cargar la ruta:", error);
                setStatus('Error al cargar la ruta ❌');
            }
        };
        cargarRuta();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Actualizando...');
        try {
            let portadaURL = ruta.foto_portada || '';
            if (portadaFile) {
                const fileName = portadaFile.name;
                const { error } = await supabase.storage.from('portadas-rutas').upload(fileName, portadaFile);
                if (error) {
                    setStatus('Error al subir la imagen ❌');
                    return;
                }
                const { data: urlData } = supabase.storage.from('portadas-rutas').getPublicUrl(fileName);
                portadaURL = urlData.publicUrl;
            }

            await updateDoc(doc(db, 'rutas', id), {
                nombre,
                descripcion,
                dificultad,
                tiempo: parseInt(tiempo),
                distancia: parseFloat(distancia),
                foto_portada: portadaURL
            });

            setStatus('Ruta actualizada correctamente ✅');
        } catch (error) {
            console.error('Error al actualizar:', error);
            setStatus('Error al actualizar ❌');
        }
    };

    if (!ruta) return <p>{status || 'Cargando ruta...'}</p>;

    return (
        <div className='editarRuta-container'>
            <h2>Editar Ruta</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

                <label>Descripción:</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />

                <label>Dificultad:</label>
                <input type="text" value={dificultad} onChange={(e) => setDificultad(e.target.value)} required />

                <label>Duración (min):</label>
                <input type="number" value={tiempo} onChange={(e) => setTiempo(e.target.value)} required />

                <label>Distancia (km):</label>
                <input type="number" step="0.01" value={distancia} onChange={(e) => setDistancia(e.target.value)} required />

                <label>Foto de Portada Actual:</label>
                <img src={ruta.foto_portada} alt="Portada actual" style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />

                <label>Cambiar Foto de Portada:</label>
                <input type="file" accept="image/*" onChange={(e) => setPortadaFile(e.target.files[0])} />

                <button type="submit">Guardar Cambios</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}
