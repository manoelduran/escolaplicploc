import './header.css'
import PlicPlocPNG from '../../assets/plicploc.png';

function Header() {
    return (
        <div className='headerContainer'>
            <img src={PlicPlocPNG} alt='Logo' width={100} height={100} style={{borderRadius: 100}}/>
            <h1 className='headerText'>Escola Plic Ploc</h1>
        </div>
    );
}

export { Header };