import '../styles/cards.css'
import { useState } from 'react'


function CardGroup(props) {
    const Heading = "h" + props.level
    
    return (
        <div id={props.id}>
            <Heading>{props.heading}</Heading>
            <div className={props.groupClass}>
                {props.cards.map((card) => {
                    return (
                        <Card
                            key={card.id}
                            class={card.class}
                            text={card.text}
                            img={card.img}
                            pClass={card.pClass}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function Card(props) {
    return (
        <div className={`card ${props.class}`}>
            <img src={props.img}/>
            <p className={props.pClass}>{props.text}</p>
        </div>
    )
}

function ProductCard({ product, addToCart }) {
    const [countInput, setCountInput] = useState(0)
  
    return (
      <div className='productCard'>
        <div className='productCardTop'>
          <Card 
            id={product.id}
            class={''}
            text={product.title}
            img={product.image}
            pClass='overlay'
          />
          <div className='priceTag'>${product.price}</div>
        </div>
        <div className='productCardBottom'>
          <form onSubmit={(event) => {
            event.preventDefault()

            if (countInput === 0) {
              return
            }
            
            addToCart(product, countInput)
            setCountInput(0)
          }}>
            <div className='countInput'>
              <button
                type='button'
                onClick={(event) => {
                  setCountInput(x => x ? x - 1 : 99)
                }}
              >-</button>
              <input
                type='text'
                placeholder={countInput}
                onMouseDown={(event) => event.preventDefault()}
              />
              <button 
                type='button'
                onClick={(event) => {
                  setCountInput(x => (x + 1) % 100)
                }}
              >+</button>
            </div>
            <input 
              type='submit' 
              value='Add To Cart'
            />
          </form>
        </div>
      </div>
    )
  }


export { CardGroup, Card, ProductCard }