import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import moment from 'moment';
import '../estilos/crearActividad.css'


export default function CrearActividad() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [rutaId, setRutaId] = useState('');
    const [rutas, setRutas] = useState([]);
    const [status, setStatus] = useState('');
    const [guias, setGuias] = useState([]);
    const [guiaId, setGuiaId] = useState('');

    useEffect(() => {
        const fetchRutas = async () => {
            const querySnapshot = await getDocs(collection(db, 'rutas'));
            const fetchedRutas = querySnapshot.docs.map(doc => ({
                id: doc.id,
                nombre: doc.data().nombre,
            }));
            setRutas(fetchedRutas);
        };
        const fetchGuias = async () => {
            const guiasQuery = query(collection(db, 'users'), where('tipo', '==', 'guia'));
            const guiasSnapshot = await getDocs(guiasQuery);
            const fetchedGuias = guiasSnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setGuias(fetchedGuias);
        };

        fetchRutas();
        fetchGuias();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const fechaHora = moment(`${fecha} ${hora}`, 'YYYY-MM-DD HH:mm').toDate();
            const guiaSeleccionado = guias.find(guia => guia.id === guiaId);
            const guiaNombre = guiaSeleccionado ? guiaSeleccionado.name : '';
            await addDoc(collection(db, 'actividades'), {
                titulo,
                descripcion,
                fecha: fechaHora,
                rutaId,
                guiaId,
                guiaNombre,
                reservas: false,
            });
            setTitulo('');
            setDescripcion('');
            setFecha('');
            setHora('');
            setRutaId('');
            setGuiaId('');
            setStatus('Actividad registrada con éxito ✅');
        } catch (error) {
            console.error('Error al registrar la actividad:', error);
            setStatus('Error al registrar la actividad ❌');
        }
    };

    return (
        <div className='margen'>
            <div className='crearActividad-container'>
                <h2>Registrar Actividad</h2>
                <form onSubmit={handleSubmit}>
                    <div className='info'>
                        <label>Título:</label>
                        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </div>
                    <div className='info'>
                        <label>Descripción:</label>
                        <textarea className="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                    <div className='info'>
                        <label>Fecha:</label>
                        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    </div>
                    <div className='info'>
                        <label>Hora:</label>
                        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
                    </div>
                    <div className='info'>
                        <label>Ruta:</label>
                        <select value={rutaId} onChange={(e) => setRutaId(e.target.value)}>
                            <option value="">Seleccionar Ruta</option>
                            {rutas.map(ruta => (
                                <option key={ruta.id} value={ruta.id}>{ruta.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='info'>
                        <label>Guía:</label>
                        <select value={guiaId} onChange={(e) => setGuiaId(e.target.value)}>
                            <option value="">Seleccionar Guía</option>
                            {guias.map(guia => (
                                <option key={guia.id} value={guia.id}>{guia.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Registrar</button>
                </form>
                {status && <p>{status}</p>}
            </div>
        </div>

    );
}
