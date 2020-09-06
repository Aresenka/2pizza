import React from 'react'
import User from './user/main'
import Admin from './admin/main'

export default props => {
    return !props.isAdmin ?
        <User
            menu={props.menu}
            currencies={props.currencies}
            currency={props.currency}
            addToCart={props.addToCart}
            changeCurrency={props.changeCurrency}
        /> :
        <Admin />
}
