import '../styles/CartPage.css'
import { useOutletContext } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from 'react'
import CartTable from '../components/CartTable.jsx'
import { ProductCard } from '../components/cards.jsx'


function CartPage() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const props = useOutletContext()

  const productCountPairs = Object.entries(props.cart).map(
    ([productId, count]) => {
      const product = props.products.find(
        p => p.id === parseInt(productId)
      )

      return [product, count]
    }
  )

  // handle case of empty cart
  if (!productCountPairs.length) {
    return (
      <div id='bodyCartPage'>
        <h1>Your Cart</h1>
        <p>
          Your cart is empty! Visit a category page to add items.
        </p>
      </div>
      
    )
  }

  function selectProduct(index) {
    setSelectedProductIndex(index)
  }

  const [selectedProduct, ] = productCountPairs[selectedProductIndex]
  
  return (
    <div id='bodyCartPage'>
      <h1>Your Cart</h1>
      <div id='cartContentsCartPage'>
        <CartTable 
          level='2' 
          cart={productCountPairs}
          removeFromCart={props.removeFromCart}
          selectProduct={selectProduct}
          selectedProductIndex={selectedProductIndex}
        />
        <ProductCard
          product={selectedProduct}
          addToCart={props.addToCart}
        />
      </div>
      <div id='buyPromptCartPage'>
        <Link to='/buy'>
          <button 
            id='buyButton'
            onClick={props.emptyCart}
          >
            Buy
          </button>
        </Link>
      </div>
    </div>
    
  )
}


export default CartPage