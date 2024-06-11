import React, {useRef, useState} from 'react';
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';
import AppConst from '../../Constants/constants';

const MealItemForm = (props) => {

    const amountInputRef = useRef();

    const [amountIsValid, setAmountIsValid] = useState(true);
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 ||
            enteredAmount < AppConst.MEAL_ITEM_FORM.MIN ||
            enteredAmountNumber > AppConst.MEAL_ITEM_FORM.MAX) {
            setAmountIsValid(false)
            return;
        }
        props.onAddToCart(enteredAmountNumber);

    };
    return (

        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={
                    {
                        id: 'amount_' + props.id,
                        type: 'number',
                        min: AppConst.MEAL_ITEM_FORM.MIN,
                        max: AppConst.MEAL_ITEM_FORM.MAX,
                        step: AppConst.MEAL_ITEM_FORM.STEP,
                        defaultValue: '1'

                    }

                }/>
            <button>+ Add</button>
            {!amountIsValid &&
                <p> {AppConst.MEAL_ITEM_FORM.MSG} ({AppConst.MEAL_ITEM_FORM.MIN}-{AppConst.MEAL_ITEM_FORM.MAX})</p>}
        </form>
    );
};

export default MealItemForm;
