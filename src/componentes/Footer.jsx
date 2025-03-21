import '../estilos/footer.css'
import unimet from '../assets/unimet.png'
import facebook from '../assets/facebook.png'
import x from '../assets/x.png'
import instagram from '../assets/instagram.png'

export default function Footer () {
    return (
        <footer className="footer">
            <div>
                <img src={unimet} alt="unimet" className="unimet" />
            </div>
            <div className="logos-container">
                <img src={facebook} alt="facebook" />
                <img src={x} alt="x" />
                <img src={instagram} alt="instagram" />
            </div>
            <div className='contactanos'>
                <p>CONTÁCTANOS</p>
                <p>+58 424 0123456</p>
            </div>
        </footer>
    )
}
