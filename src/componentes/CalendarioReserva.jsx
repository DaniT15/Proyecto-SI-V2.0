import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import '../estilos/calendario.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const localizer = momentLocalizer(moment);

export default function CalendarioReserva({ rutaId }) {
    const [actividades, setActividades] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const CustomToolbar = (toolbar) => {
        const goToToday = () => toolbar.onNavigate('TODAY');
        const goToBack = () => toolbar.onNavigate('PREV');
        const goToNext = () => toolbar.onNavigate('NEXT');
        const label = () => moment(toolbar.date).format('MMMM YYYY');

        return (
            <div className="rbc-toolbar">
                <span className="rbc-toolbar-label">{label()}</span>
                <button onClick={goToBack}>{'Mes Anterior'}</button>
                <button onClick={goToToday}>Mes Actual</button>
                <button onClick={goToNext}>{'Siguiente Mes'}</button>
            </div>
        );
    };

    useEffect(() => {
        const obtenerActividades = async () => {
            try {
                const actividadesCollection = collection(db, 'actividades');
                const actividadesSnapshot = await getDocs(actividadesCollection);
                let actividadesLista = actividadesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().titulo,
                    start: doc.data().fecha.toDate(),
                    end: doc.data().fecha.toDate(),
                    descripcion: doc.data().descripcion,
                    rutaId: doc.data().rutaId,
                    guiaNombre: doc.data().guiaNombre,
                    reservas: doc.data().reservas,
                }));

                if (rutaId) {
                    actividadesLista = actividadesLista.filter(actividad => actividad.rutaId === rutaId);
                }

                setActividades(actividadesLista);
            } catch (error) {
                setError('Error al obtener las actividades: ' + error.message);
                console.error('Error al obtener las actividades', error);
            }
        };

        obtenerActividades();
    }, [rutaId]);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleReservar = async () => {
        if (selectedEvent) {
            try {
                const actividadDocRef = doc(db, 'actividades', selectedEvent.id);
                await updateDoc(actividadDocRef, { reservas: true });

                const updatedActividades = actividades.map(actividad =>
                    actividad.id === selectedEvent.id ? { ...actividad, reservas: true } : actividad
                );
                setActividades(updatedActividades);
                setSelectedEvent({ ...selectedEvent, reservas: true });
                setIsModalOpen(false);
            } catch (error) {
                setError('Error al reservar: ' + error.message);
                console.error('Error al reservar', error);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="calendario-container" style={{ height: 1000 }}>
            {error && <div className="error-message">{error}</div>}

            <Calendar
                localizer={localizer}
                events={actividades}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                tooltipAccessor="descripcion"
                view="month"
                components={{ toolbar: CustomToolbar }}
                onSelectEvent={handleSelectEvent}
            />

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Detalles del Evento"
                className="modal"
                overlayClassName="overlay"
            >
                {selectedEvent && (
                    <div className="event-details">
                        <h2>{selectedEvent.title}</h2>
                        <p><strong>Fecha:</strong> {moment(selectedEvent.start).format('DD/MM/YYYY')}</p>
                        <Link to="/pagos" className='boton-de-reservar'>
                            <button
                                onClick={handleReservar}
                                style={{
                                    fontSize: '16px',
                                    padding: '10px 20px',
                                    color: 'white',
                                    backgroundColor: '#007bff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
                                    WebkitFontSmoothing: 'antialiased',
                                }}
                            >
                                Reservar
                            </button>
                        </Link>
                        <button onClick={closeModal}>Cerrar</button>
                    </div>
                )}
            </Modal>
        </div>
    );
}