import React, {useRef, useState} from 'react';
import classes from './Checkout.module.css'

const isEmpty = (value) => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const zipCodeInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();

    const[formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        zipCode: true,
        state: true
    })

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredZipCode = zipCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredState = stateInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredStateIsValid= !isEmpty(enteredState);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredZipCodeIsValid = isFiveChars(enteredZipCode);

        setFormInputsValidity({
            name:enteredNameIsValid,
            street: enteredStreetIsValid,
            state: enteredStreetIsValid,
            city: enteredCityIsValid,
            zipCode: enteredZipCodeIsValid,
        })
        const formIsValid = enteredNameIsValid
            && enteredStreetIsValid
            && enteredStateIsValid
            && enteredCityIsValid
            && enteredZipCodeIsValid;


        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name:enteredName,
            street: enteredStreet,
            state: enteredState,
            city: enteredCity,
            zipCode: enteredZipCode
        })

    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p> Please enter a valid name </p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`} >
                <label htmlFor="street">Street</label>
                <input type="text" id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p> Please enter a valid street </p>}

            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id='city' ref={cityInputRef}/>
                {!formInputsValidity.city && <p> Please enter a valid city </p>}

            </div>
            <div className={`${classes.control} ${formInputsValidity.state ? '' : classes.invalid}`}>
                <label htmlFor="city">State</label>
                <input type="text" id='state' ref={stateInputRef}/>
                {!formInputsValidity.state && <p> Please enter a valid state </p>}

            </div>

            <div className={`${classes.control} ${formInputsValidity.zipCode ? '' : classes.invalid}`}>
                <label htmlFor="zipCode">Zip Code</label>
                <input type="text" id='name' ref={zipCodeInputRef}/>
                {!formInputsValidity.zipCode && <p> Please enter a valid Zip Code (5 characters long) </p>}

            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>

        </form>
    );
};

export default Checkout;
