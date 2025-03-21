import { Link } from 'react-router-dom'
import '../estilos/menuAdmin.css'
export default function MenuAdmin() {
  return (
    <div className="menuAdmin-container">
      <h1>Menu de Administrador</h1>
      <div className='botones'>
        <Link to="/calendarioActividades">
          <button>Ver Calendario de Actividades</button>
        </Link>
        <Link to="/registrarGuia">
          <button>Registrar Guía</button>
        </Link>
      </div>

    </div>
  )
}
