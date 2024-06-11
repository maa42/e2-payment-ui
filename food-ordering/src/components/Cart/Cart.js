import React, {useContext, useState} from 'react';
import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import CartContext from '../../store/Cart';
import CartItem from './CartItem';
import Checkout from './Checkout';
import axios from 'axios';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting]  = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0;
    const [responseMsg, setResponseMsg]  = useState("")

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    }

    const carItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const orderHandler = () => {
        setIsCheckout(true)

    }

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true)
        axios.post('/api/meal/order', {
            userData:userData,
            meals: cartCtx.items
        }).then(function (response) {
                console.log(response);
                setIsSubmitting(false);
                setResponseMsg("JPM Payments API Response : " + response.data.responseMessage)
                setDidSubmit(true)
                cartCtx.clearCart();
            })
            .catch(function (error) {
                console.log(error);
                setIsSubmitting(false);

            });
    }

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button}
                             onClick={orderHandler}>Order</button>}
    </div>
    const cartItems =
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem key={item.id}
                          name={item.name}
                          amount={item.amount}
                          price={item.price}
                          onAdd={cartItemAddHandler.bind(null, item)}
                          onRemove={carItemRemoveHandler.bind(null, item.id)}
                />)}
        </ul>

    const cardModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>

        {isCheckout && <Checkout onConfirm ={submitOrderHandler} onCancel={props.onClose}/>}
        {!isCheckout && modalActions}

    </React.Fragment>

    const isSubmittingModalContent = <p>Sending Meal Order...</p>
    const completedMealOrderModalContent = <React.Fragment>
        <p>Successfully ordered!</p>
        <p>{responseMsg}</p>

        <div className={classes.actions}>
            <button type='button' className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cardModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting  && didSubmit && completedMealOrderModalContent}
        </Modal>
    );
};

export default Cart;
