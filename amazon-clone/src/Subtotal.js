import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';


function Subtotal() {
  const[{basket}, dispatch] = useStateValue();
  const basketCount = basket.length; 
  const navigate = useNavigate();

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
                {/* Replace with the actual number of items in the basket */}
              Subtotal ({basketCount} items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Replace with the actual value 
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
        />

        <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>    
    </div>
  )
}

export default Subtotal