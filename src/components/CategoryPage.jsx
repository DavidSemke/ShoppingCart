import '../styles/CategoryPage.css'
import { useOutletContext, useParams } from "react-router-dom"
import { ProductCard } from '../components/cards.jsx'


function CategoryPage() {
  const props = useOutletContext()
  const { categoryId } = useParams() // get category from URL

  const categoryProducts = props.products.filter(
    p => p.category === categoryId
  )

  return (
    <div id='bodyCategoryPage'>
      <h1>{categoryId}</h1>
      <div className='horizontalCards'>
        {categoryProducts.map(p => {
          return (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={props.addToCart}
            />
          )
        })}
      </div>
    </div>
  )
}


export default CategoryPage