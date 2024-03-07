import '../styles/CartTable.css'
import deleteIcon from '../assets/images/delete.png'


function CartTable(props) {
    const Heading = "h" + props.level

    return (
        <div>
            <Heading>{'Items'}</Heading>
            <table className='cartTable'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Count</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                {props.cart.map(([product, count], index) => {
                    return <Item
                        key={product.id}
                        product={product}
                        count={count}
                        removeFromCart={props.removeFromCart}
                        selectProduct={props.selectProduct}
                        selectedProductIndex={props.selectedProductIndex}
                        index={index}
                    />
                })}
                </tbody>
                
            </table>
            <div className='cartTotal'>
                Total: ${
                    props.cart.reduce((acc, [product, count]) => {
                        return acc + product.price*count
                    }, 0)
                }
            </div>
        </div>
        
    )
}

function Item(props) {
    return (
        <tr 
            className={
                props.index === props.selectedProductIndex 
                    ? 'cartItem selected' : 'cartItem'
            }
            onClick={() => {
                props.selectProduct(props.index)
            }}
        >
            <td>
                <button 
                    className='cartItemDeleteButton' 
                    onClick={() => {
                        // may need to adjust state selectedProductIndex
                        if (props.index < props.selectedProductIndex) {
                            props.selectProduct(
                                props.selectedProductIndex - 1
                            )
                        }
                        else if (
                            props.index === props.selectedProductIndex
                        ) {
                            props.selectProduct(0)
                        }

                        props.removeFromCart(props.product, props.count)
                    }}>
                    <img src={deleteIcon}/>
                </button>
            </td>
            <td>
                <div>
                    <div>{props.product.title}</div>
                </div>
            </td>
            <td>
                <div>
                    <div>{props.count}</div>
                </div>
            </td>
            <td>
                <div>
                    <div>
                    {'$' + (props.product.price * props.count.toFixed(2))}
                    </div>
                </div>
            </td>
            
            
        </tr>
    )
}


export default CartTable