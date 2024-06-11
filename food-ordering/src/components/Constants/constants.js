import React from 'react';

const AppConst = {
    SITE_WIDE: {
        APP_TITLE: "e2 Local Eats"
    },
    USER: {
        LOGGED_IN_KEY: 'isLoggedIn'
    },
    CART_ACTIONS: {
        ADD: 'ADD',
        REMOVE: 'REMOVE',
        CLEAR_CART: 'CLEAR_CART'
    },
    MEAL_ITEM_FORM: {
        MIN: 1,
        STEP: 1,
        MAX: 5,
        MSG: 'Please enter a valid Amount'
    },
    DUMMY_DATA: {

        CART_ITEMS: [
            {
                id: 'c1',
                name: 'Sushi',
                amount: 2,
                price: 12.99
            }
        ],
        MEALS:[
            {
                id: 'm1',
                name: 'Sushi',
                description: 'Finest fish and veggies',
                price: 22.99,
            },
            {
                id: 'm2',
                name: 'Schnitzel',
                description: 'A german specialty!',
                price: 16.5,
            },
            {
                id: 'm3',
                name: 'Barbecue Burger',
                description: 'American, raw, meaty',
                price: 12.99,
            },
            {
                id: 'm4',
                name: 'Green Bowl',
                description: 'Healthy...and green...',
                price: 18.99,
            }
        ]
    }
}

export default AppConst;
