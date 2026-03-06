import React, { use, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { NumericFormat } from 'react-number-format';
import { getBasketTotal } from './reducer';
import { useState } from 'react';
import {db} from './firebase'; // Import Firestore database
import axios from './axios'; // Import Axios for making HTTP requests

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    // Hooks

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = React.useState(null);
    const [disabled, setDisabled] = React.useState(true);
    const [succeeded, setSucceeded] = React.useState(false);
    const [processing, setProcessing] = React.useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //Generate the special Strip secret which allows us to charge a customer

        const getClientSecret = async () => {
            //Axios is used to make HTTP requests
            const response = await axios({
                method: 'post',
                    // Stripe expects the total in a currency subunit (e.g., cents for USD)
                url: `/payments/create?total=${getBasketTotal(basket) * 100}` // Stripe expects the total in cents

            });
            setClientSecret(response.data.clientSecret);
            
        } 
        getClientSecret();
    }, [basket])

    console.log('The secret is >>>', clientSecret);
    console.log('User is >>>', user);

    const handleSubmit = async (event) =>{
        // Stripe payment integration
        event.preventDefault();
        setProcessing(true);


        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),

            }
        }).then(({ paymentIntent }) => {
            
            db
            .collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET' // Clear the basket after payment
            })
            navigate('/orders', {replace: true}); // Redirect to orders page after payment
        })
  
    }

    const handleChange = event => {
        // Listen for the changes in the Card Element
        // and display any errors as the customer tpyes their card details.
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }

    return (
        <div className='payment'>

            <div className='payment__container'>
            <h1>
                Chekcout (<Link to='/checkout'>{basket.length} items</Link>)
            </h1>


                { /* Delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>

                    <div className='payment__address'>
                        <p>{user ? user.email : 'Guest'}</p>
                        <p>123 React Lane</p>
                        <p>Vancouver, BC 123456</p>
                    </div>

                </div>

                { /* Review items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>

                    </div>

                    <div className='payment__items'>
                        {/* Map through the basket items and display them */}
                        {basket.map(item => (
                            <CheckoutProduct 
                                id = {item.id}
                                title = {item.title}
                                image={ item.image}
                                price={ item.price}
                                rating = {item.rating}
                            />
                        ))}
                    </div>
                </div>

                { /* Payment method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>

                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className='payment_priceContainer'>
                                <NumericFormat 
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} /// Calculate total price
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button 
                                    disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> :
                                        "Buy Now"}</span>      
                                </button>

                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment