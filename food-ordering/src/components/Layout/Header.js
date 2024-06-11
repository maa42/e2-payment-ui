import React, {Fragment} from 'react';
import AppConst from '../Constants/constants';
import mealsImages from '../../assets/meals.jpg';
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1> {AppConst.SITE_WIDE.APP_TITLE}</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImages} alt='A table full of food'/>

            </div>
        </Fragment>
    );
};

export default Header;
