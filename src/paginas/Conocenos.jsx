import '../estilos/conocenos.css'
import logo from '../assets/logo-conocenos.png'

export default function Conocenos () {
    return (
        <div>
            <div className='bg'>
                
                <h1>CONÓCENOS</h1>  
            </div>
            <div className='div-info'>
                <div className='info bloque1'>
                    <h1>Apasionados por el Ávila</h1>
                    <p>Somos un grupo de amantes de la naturaleza que compartimos la pasión por el senderismo y la belleza del Ávila. Nuestra misión es guiar a otros a descubrir los secretos de esta montaña mágica, crear experiencias inolvidables y que cada vez seamos más personas con amor al senderismo.</p>
                </div>
                
                <div className='info bloque2'>
                    <h1>¿Qué hacemos?</h1>
                    <p>Ofrecemos rutas guiadas de senderismo en el Ávila de todos los niveles, desde caminatas suaves para principiantes hasta ascensos desafiantes para expertos. También organizamos excursiones personalizadas y campamentos en la montaña, para que puedas disfrutar del Ávila a tu manera.</p>
                </div>
                <div className='info bloque3'>
                    <h1>¿Por qué lo hacemos?</h1>
                    <p>Porque amamos el Ávila y queremos que otros también lo hagan y la disfruten. Por eso queremos mostrarte los secretos de esta montaña, sus paisajes increíbles, su flora y fauna únicas. Queremos que sientas la emoción de llegar a la cima, la paz de caminar entre los árboles, la conexión con la naturaleza que solo el senderismo puede darte. Queremos inspirarte a cuidar el Ávila, a protegerlo, a valorarlo como el tesoro que es.</p>
                </div>
                <div>
                    <img src={logo} className='logo-conocenos' />
                </div>
            </div>
            
        </div>
    )
}
