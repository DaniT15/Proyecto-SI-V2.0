import '../estilos/conocenos.css';
import logo from '../assets/logo-conocenos.png';

export default function Conocenos () {
    return (
        <div>
            <div className='bg'>
                <h1>CONÓCENOS</h1>  
            </div>

            {/* Logo centrado debajo del banner */}
            <div className="logo-container">
                <img src={logo} className="logo-conocenos" />
            </div>

            <div className='div-info'>
                <div className='info bloque1'>
                    <h1>Apasionados por el Ávila</h1>
                    <p>Somos un grupo diverso y unido por un amor profundo hacia la naturaleza, con el Ávila como nuestro epicentro de admiración. Compartimos una pasión inquebrantable por el senderismo y nos maravillamos ante la majestuosidad y la belleza de esta montaña emblemática. Nuestra misión trasciende la simple actividad física; buscamos ser embajadores de este tesoro natural, guiando a otros a descubrir sus secretos mejor guardados. Nos esforzamos por crear experiencias de senderismo que dejen huellas imborrables en el alma de cada participante, fomentando un sentido de comunidad y un creciente amor por el senderismo en cada persona que se une a nosotros.</p>
                </div>
                
                <div className='info bloque2'>
                    <h1>¿Qué hacemos?</h1>
                    <p>Ofrecemos rutas guiadas de senderismo en el Ávila de todos los niveles, desde caminatas suaves para principiantes hasta ascensos desafiantes para expertos. También organizamos excursiones personalizadas y campamentos en la montaña, para que puedas disfrutar del Ávila a tu manera.</p>
                </div>

                <div className='info bloque3'>
                    <h1>¿Por qué lo hacemos?</h1>
                    <p>Porque amamos el Ávila y queremos que otros también lo hagan y la disfruten. Por eso queremos mostrarte los secretos de esta montaña, sus paisajes increíbles, su flora y fauna únicas. Queremos que sientas la emoción de llegar a la cima, la paz de caminar entre los árboles, la conexión con la naturaleza que solo el senderismo puede darte. Queremos inspirarte a cuidar el Ávila, a protegerlo, a valorarlo como el tesoro que es.</p>
                </div>
            </div>
        </div>
    );
}