import '../styles/App.css'
import closeIcon from '../assets/images/close.png'
import { productData } from '../data/productData.js'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'


function App() {
  // Cart will be an object of format {id: count}
  // Cost of item of id can be obtained from product with same id
  const [cart, setCart] = useState({})
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)
  const [toast, setToast] = useState(null)

  // Fetch product data
  useEffect(() => {
    let isMounted = true

    async function fetchProductData() {
        const data = await productData.allProductData()
        
        if (!isMounted) {
            return
        }
        
        if (data instanceof Error) {
            setError(data)
        }
        else {
            setProducts(data)
        }
    }

    fetchProductData()

    return () => {
        isMounted = false
    }
  }, [])

  if (error) {
    return (
      <div id='rootApp' className='error'>
        <p>A network error occurred.</p>
      </div>
    )
  }

  if (!products) {
    return (
      <div id='rootApp' className='loading'>
        <p className='loading'>Loading...</p>
      </div>
      
    )
  }

  // Creating component props

  function openSideBar() {
    setSideBarIsOpen(true)
  }

  function closeSideBar() {
    setSideBarIsOpen(false)
  }

  function showToast(msg) {
    setTimeout(() => setToast(null), 3000)
    setToast(msg)
  }

  function addToCart(item, count) {
    showToast(`Added (${item.title}) x ${count} to cart.`)

    if (item.id in cart) {
      count += cart[item.id]
    }

    setCart({...cart, [item.id]: count})
  }

  function removeFromCart(item, count) {
    showToast(`Removed ${item.title} x ${count} from cart.`)
    
    if (!(item.id in cart)) {
      return
    }

    count = cart[item.id] - count

    if (count <= 0) {
      const cartClone = {...cart}
      delete cartClone[item.id]
      setCart(cartClone)
    }
    else {
      setCart({...cart, [item.id]: count})
    }
  }

  function emptyCart() {
    setCart({})
  }

  const cartTotal = products.reduce(
    (acc, item) => {
      if (item.id in cart) {
        return acc + item.price * cart[item.id]
      }

      return acc
  }, 0)

  return (
    <div id='rootApp'>
      {toast && <Toast msg={toast}/>}

      {sideBarIsOpen && 
      <SideBar 
        categories={
          [...new Set(products.map((p => p.category)))]
        } 
        onCloseClick={closeSideBar}
      />}

      <NavBar 
        cartTotal={cartTotal}
        onHamburgerClick={openSideBar}
      />

      <div id='bodyApp'>
        <Outlet context={
          {
            addToCart,
            removeFromCart,
            emptyCart,
            products,
            cart
          }
        } />
      </div>
    </div>
  )
}

// Visible when hamburger symbol in navbar clicked
// Used to navigate to category pages
function SideBar(props) {
  return (
    <div id='sideBar'>
      
        <img 
          id='sideBarCloser'
          src={closeIcon} 
          onClick={props.onCloseClick}
        />
      <div id='sideBarBody'>
        <div>Categories</div>
        <ul>
          {props.categories.map((cat => {
            return (
              <li key={cat}>
                <Link to={'categories/' + cat}>
                  {cat}
                </Link>
              </li>
            )
            
          }))}
        </ul>
      </div>    
    </div>
      
  )
}

function Toast({ msg }) {
  return (
      <div className='toast'>
          <p>{msg}</p>
      </div>
  )
}


export default App
