import React, {useContext} from 'react';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/Cart';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.item.price.toFixed(2)}`
    const addToCartHandler = (amount) => {
        cartCtx.addItem(
            {
                id: props.item.id,
                name: props.item.name,
                amount: amount,
                price: props.item.price
            }
        );
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.item.name}</h3>

                <div className={classes.description}>
                    {props.item.description}
                </div>
                <div className={classes.price}>
                    {price}
                </div>
            </div>
            <div>
                <MealItemForm id={props.item.id} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
};

export default MealItem;
