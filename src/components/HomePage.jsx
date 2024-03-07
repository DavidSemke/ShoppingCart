import '../styles/HomePage.css'
import { useOutletContext } from "react-router-dom";
import Slideshow from '../components/Slideshow.jsx'
import {CardGroup} from '../components/cards.jsx'
import Banner from '../components/Banner.jsx'


function HomePage() {
  const products = useOutletContext().products
  
  // sort products into lists by category
  const categoryProducts = {}

  for (const product of products) {
    const cat = product.category

    if (cat in categoryProducts) {
      categoryProducts[cat].push(product)
    }
    else {
      categoryProducts[cat] = [product]
    }
  }

  let productGroups = []

  // Make 3 groups, where each grouped product comes from a diff category
  // Groups will be displayed in crazy/popular/category sections
  for (let i=0; i<3; i++) {
    productGroups.push([])

    for (const category in categoryProducts) {
      productGroups[i].push(categoryProducts[category][i])
    }
  }
  
  return (
    <>
      <div id='topHome'>
        <div id='crazyDealsHome'>
          <h1>Crazy Deals</h1>
          <Slideshow slides={
            productGroups[0].map(p => p.image)
          }/>
        </div>
        
        <CardGroup
          id='popularDealsHome'
          groupClass='horizontalCards'
          level='1'
          heading='Popular Deals'
          cards={
            productGroups[1].map(p => {
              return {
                'id': p.id,
                'class': '',
                'text': p.title,
                'img': p.image,
                'pClass': 'overlay'
              }
            })
          }
        />
      </div>
      
      <div id='bottomHome'>
        <CardGroup
          id='categoriesHome'
          groupClass='horizontalCards'
          level='1'
          heading='Categories'
          cards={
            productGroups[2].map(p => {
              return {
                'id': p.id,
                'class': 'fade',
                'text': p.category,
                'img': p.image,
                'pClass': ''
              }
            })
          }
        />
          
        <Banner
          id='bannerHome'
          text='I came, I saw, and I bought a lot of stuff. - Julius Geezer'
        /> 
      </div>
    </>
    
  )
}


export default HomePage