import { Link } from 'react-router-dom'
import Calendario from '../componentes/Calendario';
import '../estilos/calendarioActividades.css'


export default function CalendarioActividades() {
    return (
        <div className='container'>
            <div className='botones-calendario'>
                <Link to="/crearActividad">
                    <button>Crear Actividad</button>
                </Link>
                <Link to="/registrarRuta">
                    <button>Registrar Ruta</button>
                </Link>
            </div>
            <Calendario></Calendario>
        </div>
    )
}
