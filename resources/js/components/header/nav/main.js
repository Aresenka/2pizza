import React from 'react'
import NavList from './navList'
import NavButton from './navButton'
import Cart from './cart/main'

export default props => {
    return (
        <nav className="nav-menu d-none d-lg-block">
            <NavList empty={props.cart.filter(item=>item).length === 0}/>
            <Cart
                items={props.cart}
                currency={props.currency}
                cartIsOpen={props.cartIsOpen}
                toggleCart={props.toggleCart}
                changeCount={props.changeCount}
                removeItem={props.removeItem}
                checkoutOrder={props.checkoutOrder}
            />
            <NavButton />
        </nav>
        )
}
