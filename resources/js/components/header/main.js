import React, {Component} from 'react'
import Logo from './logo'
import Navbar from './nav/main'

export default props => {
    return (
        <header
            id="header"
            className="fixed-top"
        >
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-11 d-flex align-items-center">
                        <Logo title={props.companyName}/>
                        <Navbar
                            currency={props.currency}
                            cart={props.cart}
                            cartIsOpen={props.cartIsOpen}
                            toggleCart={props.toggleCart}
                            changeCount={props.changeCount}
                            removeItem={props.removeItem}
                            checkoutOrder={props.checkoutOrder}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}
