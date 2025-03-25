import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import '../estilos/calendario.css';
import { Link } from 'react-router-dom';


const localizer = momentLocalizer(moment);

export default function CalendarioReserva({ rutaId }) {
    const [actividades, setActividades] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const CustomToolbar = (toolbar) => {
        const goToToday = () => {
            toolbar.date.setMonth(new Date().getMonth());
            toolbar.date.setFullYear(new Date().getFullYear());
            toolbar.onNavigate('TODAY');
        };

        const goToBack = () => {
            toolbar.onNavigate('PREV');
        };

        const goToNext = () => {
            toolbar.onNavigate('NEXT');
        };

        const label = () => {
            const date = moment(toolbar.date);
            return (
                <span>{date.format('MMMM YYYY')}</span>
            );
        };

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
            const actividadesCollection = collection(db, 'actividades');
            const actividadesSnapshot = await getDocs(actividadesCollection);
            let actividadesLista = actividadesSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data.titulo,
                    start: data.fecha.toDate(),
                    end: data.fecha.toDate(),
                    descripcion: data.descripcion,
                    rutaId: data.rutaId,
                    guiaNombre: data.guiaNombre,
                    reservas: data.reservas
                };
            });

            if (rutaId) {
                actividadesLista = actividadesLista.filter(actividad => actividad.rutaId === rutaId);
            }

            setActividades(actividadesLista);
        };

        obtenerActividades();
    }, [rutaId]);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const handleReservar = async () => {
        if (selectedEvent) {
            try {
                const actividadDocRef = doc(db, 'actividades', selectedEvent.id);
                await updateDoc(actividadDocRef, {
                    reservas: true,
                });

                const updatedActividades = actividades.map(actividad => {
                    if (actividad.id === selectedEvent.id) {
                        return { ...actividad, reservas: true };
                    }
                    return actividad;
                });
                setActividades(updatedActividades);
                setSelectedEvent({ ...selectedEvent, reservas: true });
            } catch (error) {
                console.error('Error al reservar:', error);
            }
        }
    };


    return (
        <div className="calendario-container" style={{ height: 1000 }}>
            {selectedEvent && (
                <div className="event-details">
                    <h2>{selectedEvent.title}</h2>
                    <p><strong>Fecha:</strong> {moment(selectedEvent.start).format('DD/MM/YYYY')}</p>
                    <Link to="/pagos" className='boton-de-reservar'>
                        <button  onClick={handleReservar}>Reservar</button>
                    </Link>

                </div>
            )}

            <Calendar
                localizer={localizer}
                events={actividades}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                tooltipAccessor="descripcion"
                view="month"
                components={{
                    toolbar: CustomToolbar,
                }}
                onSelectEvent={handleSelectEvent}
            />
        </div>
    );
}
