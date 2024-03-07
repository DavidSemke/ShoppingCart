import '../styles/NavBar.css'
import hamburgerIcon from '../assets/images/hamburger.png'
import cartIcon from '../assets/images/cart.png'
import { Link } from "react-router-dom"


function NavBar(props) {

    return (
        <div id='navBar'>
            <div 
                id='hamburger'
                onClick={props.onHamburgerClick} 
            >
                <img src={hamburgerIcon}/>
            </div>
            <Link to='/'>
                <div id='siteTitle'>JMart</div>
            </Link>
            
            <Link to='cart'>
                <Cart cartTotal={props.cartTotal}/>
            </Link>
            
        </div>
    )
}

// Displays cart img and total shopping price
function Cart(props) {
    return (
        <div id='cartNavBar'>
            <img src={cartIcon}/>
            <div>${props.cartTotal.toFixed(2)}</div>
        </div>
    )
}


export default NavBar