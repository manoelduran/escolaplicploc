import './header.css'

function Header() {
    return (
        <div className='headerContainer'>
            <img src='plicploc.png' alt='Logo' width={100} height={100} style={{borderRadius: 100}}/>
            <h1 className='headerText'>Escola Plic Ploc</h1>
        </div>
    );
}

export { Header };