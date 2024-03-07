import { Link } from "react-router-dom";


function BuyPage() {
  return (
    <div>
        <h1>Thank you for your money!</h1>
        <p>
            Okay you can go away now bye bye.
        </p>
        
        <Link to='/'>
            Return Home
        </Link>
    </div>
  )
}


export default BuyPage